import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignsRequestSchema";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";
import { CampaignLeadsRepository } from "../repositories/CampaignLeadsRepository";

export class CampaignLeadsController {
    constructor(
        private readonly leadRepository: LeadsRepository,
        private readonly campaignLeadRepository: CampaignLeadsRepository
    ){}

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const {page = "1", pageSize = "10", name, sortBy = "name", order = "asc"} = query

            const pageNumber = +page
            const limit = +pageSize

            const where: LeadWhereParams = {campaignId}

            if(name) where.name = {like: name, mode: "insensitive"}

            const leads = await this.leadRepository.find({
                where,
                sortBy,
                order,
                limit,
                offset: (pageNumber - 1) * limit,
                include: {campaigns: true}
            })

            const total = await this.leadRepository.count(where)

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

    addLead: Handler = async (req, res, next) => {
        try {
            const body = AddLeadRequestSchema.parse(req.body)
            const campaignId = +req.params.campaignId
            const leadId = body.leadId
            const status = body.status ?? "New"

            const addedLead = await this.campaignLeadRepository.create({campaignId, leadId, status})
            res.status(201).json(addedLead)
        } catch (error) {
            next(error)
        }
    }

    updateLeadStatus: Handler = async (req, res, next) => {
        try {
            const body = UpdateLeadStatusRequestSchema.parse(req.body)
            const campaingId = +req.params.campaignId
            const leadId = +req.params.leadId

            const updatedLeadCampaign = await this.campaignLeadRepository.update(leadId, campaingId, body)
            res.json(updatedLeadCampaign)
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const leadId = +req.params.leadId
            const campaignId = +req.params.campaignId
            
            const removedLead = await this.campaignLeadRepository.delete(leadId, campaignId)
            res.json(removedLead)
        } catch (error) {
            next(error)
        }
    }
}