import { LeadCampaign } from "@prisma/client";
import { CampaignLeadsRepository, CreateCampaignLeadsAttributes } from "../repositories/CampaignLeadsRepository";
import { prisma } from "../database";

export class PrismaCampaignLeadsRepository implements CampaignLeadsRepository{
    create(attributes: CreateCampaignLeadsAttributes): Promise<LeadCampaign | null>{
        return prisma.leadCampaign.create({
            data: {
                campaingId: attributes.campaignId,
                leadId: attributes.leadId,
                status: attributes.status
            }
        })
    }

    update(leadId: number, campaignId: number, attributes: Partial<CreateCampaignLeadsAttributes>): Promise<LeadCampaign | null>{
        return prisma.leadCampaign.update({
            data: attributes,
            where: {
                leadId_campaingId: {
                    campaingId: campaignId,
                    leadId
                }
            }
        })
    }

    delete(leadId: number, campaignId: number): Promise<LeadCampaign | null>{
        return prisma.leadCampaign.delete({
            where: {
                leadId_campaingId: {
                    campaingId: campaignId,
                    leadId
                }
            }
        })
    }
    
}