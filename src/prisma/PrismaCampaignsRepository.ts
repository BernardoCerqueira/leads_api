import { Campaign } from "@prisma/client";
import { CampaignRepository, CreateCampaignAttributes } from "../repositories/CampaignRepository";
import { prisma } from "../database";

export class PrismaCampaignRepository implements CampaignRepository{
    index(): Promise<Campaign[]>{
        return prisma.campaign.findMany()
    }

    show(campaignId: number): Promise<Campaign | null>{
        return prisma.campaign.findUnique({
            where: {id: campaignId},
            include: {
                leads: {
                    include: {
                        lead: true
                    }
                }
            }
        })
    }

    create(attributes: CreateCampaignAttributes): Promise<Campaign>{
        return prisma.campaign.create({
            data: attributes
        })
    }

    update(campaignId: number, attributes: Partial<CreateCampaignAttributes>): Promise<Campaign | null>{
        return prisma.campaign.update({
            where: {id: campaignId},
            data: attributes
        })
    }

    delete(campaignId: number): Promise<Campaign | null>{
        return prisma.campaign.delete({
            where: {id: campaignId}
        })
    }   
}