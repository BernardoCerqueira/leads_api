import { Handler } from "express";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { GroupRepository } from "../repositories/GroupRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";
import { AddLeadRequestSchema } from "./schemas/CampaignsRequestSchema";

export class GroupLeadsController {
    constructor(
        private readonly groupsRepository: GroupRepository,
        private readonly leadsRepository: LeadsRepository
    ) {}

    index: Handler = async (req, res, next) => {
        try {
            const groupId = Number(req.params.groupId) 
            const query = GetLeadsRequestSchema.parse(req.query)
            const {page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc"} = query

            const limit = +pageSize
            const offset = (Number(page) - 1) * limit

            const where: LeadWhereParams = {groupId}
            if(name) where.name = {like: String(name), mode: "insensitive"}

            const leads = await this.leadsRepository.find({
                where,
                sortBy,
                order,
                limit, 
                offset,
                include: {groups: true}
            })

            const total = await this.leadsRepository.count(where)

            res.json({
                data: leads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    totalLeads: total,
                    totalPages: Math.ceil(total/limit)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const {leadId} = AddLeadRequestSchema.parse(req.body)
        
            const updatedGroup = await this.groupsRepository.addLead(groupId, leadId)

            res.status(201).json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const leadId = +req.params.leadId
            const deletedLead = await this.groupsRepository.removeLead(groupId, leadId)
            res.json(deletedLead)
        } catch (error) {
            next(error)
        }
    }
}