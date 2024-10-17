import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "./schemas/CampaignsRequestSchema";
import { CampaignLeadsService } from "../services/CampaignLeadsService";

export class CampaignLeadsController {
    constructor(
        private readonly campaignLeadsService: CampaignLeadsService,
    ){}

    getLeads: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const {page = "1", pageSize = "10", name, sortBy = "name", order = "asc"} = query

            const result = await this.campaignLeadsService.getAllLeadsFromCampaign(campaignId,
                {
                    page: +page,
                    pageSize: +pageSize,
                    name,
                    sortBy,
                    order
                })

            res.json({
                data: result.leads,
                meta: {
                    page: +page,
                    pageSize: +pageSize,
                    total: result.total,
                    totalPages: Math.ceil(result.total / Number(pageSize))
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

            const addedLead = await this.campaignLeadsService.addLeadOnCampaign(campaignId, leadId, status)
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

            const updatedLeadCampaign = await this.campaignLeadsService.updateLeadStatusOnCampaign(leadId, campaingId, body)
            res.json(updatedLeadCampaign)
        } catch (error) {
            next(error)
        }
    }

    removeLead: Handler = async (req, res, next) => {
        try {
            const leadId = +req.params.leadId
            const campaignId = +req.params.campaignId
            
            const removedLead = await this.campaignLeadsService.deleteLeadFromCampaign(leadId, campaignId)
            res.json(removedLead)
        } catch (error) {
            next(error)
        }
    }
}