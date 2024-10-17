import { LeadCampaignStatus } from "@prisma/client"
import { CampaignLeadsRepository, CreateCampaignLeadsAttributes } from "../repositories/CampaignLeadsRepository"
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository"

export interface GetAllLeadsFromCampaign{
    page?: number
    pageSize?: number
    name?: string
    sortBy?: "name" | "id" | "status" | "createdAt",
    order?: "asc" | "desc"
}

export class CampaignLeadsService{
    constructor(
        private readonly leadRepository: LeadsRepository,
        private readonly campaignLeadsRepository: CampaignLeadsRepository
    ){}

    async getAllLeadsFromCampaign(campaignId: number, query: GetAllLeadsFromCampaign){
        const {name, page = 1, pageSize = 10, order, sortBy} = query
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

        return {leads, total}
    }

    async addLeadOnCampaign(campaignId: number, leadId: number, status: LeadCampaignStatus){
        const addedLead = await this.campaignLeadsRepository.create({campaignId, leadId, status})
        return addedLead
    }

    async updateLeadStatusOnCampaign(leadId: number, campaignId: number, body: Partial<CreateCampaignLeadsAttributes>){
        const updatedLeadCampaign = await this.campaignLeadsRepository.update(leadId, campaignId, body)
        return updatedLeadCampaign
    }

    async deleteLeadFromCampaign(leadId: number, campaignId: number){
        const removedLead = await this.campaignLeadsRepository.delete(leadId, campaignId)
        return removedLead
    }
}