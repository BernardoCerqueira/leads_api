import { Handler } from "express";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class LeadsController {
    private leadsRepository: LeadsRepository

    constructor(leadsRepository: LeadsRepository){
        this.leadsRepository = leadsRepository
    }

    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query)
            const {page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc"} = query

            //PAGINAÇÃO
            const pageNumber = +page
            const limit = +pageSize

            //FILTRO
            const where: LeadWhereParams = {}
            if (name) where.name = {like: name, mode: "insensitive"}
            if(status) where.status = status

            const leads = await this.leadsRepository.find({
                where,
                sortBy,
                order,
                limit,
                offset: (pageNumber - 1) * limit
            })

            const total = await this.leadsRepository.count(where)

            res.json({
                data: leads,
                meta: {
                    page: pageNumber,
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body)
            if(!body.status) body.status = "New"

            const newLead = await this.leadsRepository.create(body)
            // const newLead = await prisma.lead.create({
            //     data: body
            // })
            
            res.status(201).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const lead = await this.leadsRepository.findById(+req.params.id)
            // const lead = await prisma.lead.findUnique({
            //     where: {
            //         id: +req.params.id
            //     },
            //     include: {
            //         groups: true,
            //         campaigns: true
            //     }
            // })

            if(!lead) throw new HttpError(404, "Lead not found.")

            res.json(lead)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateLeadRequestSchema.parse(req.body)

            // const lead = await prisma.lead.findUnique({where: {id: +req.params.id}})
            const lead = await this.leadsRepository.findById(+req.params.id)
            if (!lead) throw new HttpError(404, "Lead not found.")

            if(lead.status === "New" && body.status !== undefined && body.status !== "Contacted"){
                throw new HttpError(400, "A new lead must be contacted first so its status can be updated into other values.")
            }

            if(body.status && body.status === "Archived") {
                const now = new Date()
                const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime())
                const diffDays = Math.ceil(diffTime / (1000*60*60*24))
                if(diffDays < 180) throw new HttpError(400, `A lead can only be archived after 6 months of inativity.\nCurrent inativity time: ${diffDays} days.`)
            }

            const updatedLead = await this.leadsRepository.updateById(+req.params.id, body)
            // const updatedLead = await prisma.lead.update({
            //     where: {
            //         id: +req.params.id
            //     },
            //     data: body
            // })

            res.json(updatedLead)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const leadExists = await this.leadsRepository.findById(+req.params.id)
            // const leadExists = await prisma.lead.findUnique({where: {id: +req.params.id}})
            if (!leadExists) throw new HttpError(404, "Lead not found.")

            const deletedLead = await this.leadsRepository.deleteById(+req.params.id)
            // const deletedLead = await prisma.lead.delete({
            //     where: {id: +req.params.id}
            // })

            res.json({message: "User deleted successfully.", deletedLead})
        } catch (error) {
            next(error)
        }
    }
}