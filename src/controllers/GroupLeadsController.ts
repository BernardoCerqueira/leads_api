import { Handler } from "express";
import { GetLeadsRequestSchema } from "./schemas/LeadsRequestSchema";
import { AddLeadRequestSchema } from "./schemas/CampaignsRequestSchema";
import { GroupLeadsService } from "../services/GroupLeadsService";

export class GroupLeadsController {
    constructor(
        private readonly groupLeadsService: GroupLeadsService,
    ) {}

    index: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const query = GetLeadsRequestSchema.parse(req.query)
            const {page = "1", pageSize = "10"} = query

            const result = await this.groupLeadsService.getAllLeadsFromGroup(groupId,
                {
                    name: query.name,
                    status: query.status,
                    page: +page,
                    pageSize: +pageSize,
                    sortBy: query.sortBy,
                    order: query.order
                }
            )

            res.json({
                data: result.leads,
                meta: {
                    page: Number(page),
                    pageSize: +pageSize,
                    totalLeads: result.total,
                    totalPages: Math.ceil(result.total/Number(pageSize))
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
            const updatedGroup = await this.groupLeadsService.addLeadToGroup(groupId, leadId)
            res.status(201).json(updatedGroup)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const leadId = +req.params.leadId
            const deletedLead = await this.groupLeadsService.removeLeadFromGroup(groupId, leadId)
            res.json(deletedLead)
        } catch (error) {
            next(error)
        }
    }
}