import { Campaign } from "@prisma/client";

export interface CreateCampaignAttributes{
    name: string
    description: string
    startDate: Date
    endDate?: Date
}

export interface CampaignRepository{
    index: () => Promise<Campaign[]>
    show: (campaignId: number) => Promise<Campaign | null>
    create: (attributes: CreateCampaignAttributes) => Promise<Campaign>
    update: (campaignId: number, attributes: Partial<CreateCampaignAttributes>) => Promise<Campaign | null>
    delete: (campaignId: number) => Promise<Campaign | null>
}