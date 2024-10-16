import { LeadCampaign, LeadCampaignStatus } from "@prisma/client";

export interface CreateCampaignLeadsAttributes{
    campaignId: number,
    leadId: number,
    status?: LeadCampaignStatus
}

export interface CampaignLeadsRepository{
    create: (attributes: CreateCampaignLeadsAttributes) => Promise<LeadCampaign | null>
    update: (leadId: number, campaignId: number, attributes: Partial<CreateCampaignLeadsAttributes>) => Promise<LeadCampaign | null>
    delete: (leadId: number, campaignId: number) => Promise<LeadCampaign | null>
}