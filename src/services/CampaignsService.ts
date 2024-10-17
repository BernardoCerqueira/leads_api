import { HttpError } from "../errors/HttpError";
import { CampaignRepository, CreateCampaignAttributes } from "../repositories/CampaignRepository";

export class CampaignsService{
    constructor(private readonly campaignRepository: CampaignRepository){}

    async getAllCampaigns(){
        const campaigns = await this.campaignRepository.index()
        return campaigns
    }

    async getCampaignById(campaignId: number){
        const campaign = await this.campaignRepository.show(campaignId)
        if (!campaign) throw new HttpError(404, "Campaign not found.")
        return campaign
    }

    async createCampaign(body: CreateCampaignAttributes){
        const newCampaing = await this.campaignRepository.create(body)
        return newCampaing
    }

    async updateCampaign(campaignId: number, body: Partial<CreateCampaignAttributes>){
        await this.getCampaignById(campaignId)
        const updatedCampaign = await this.campaignRepository.update(campaignId, body)
        return updatedCampaign
    }

    async deleteCampaign(campaignId: number){
        await this.getCampaignById(campaignId)
        const deletedCampaign = await this.campaignRepository.delete(campaignId)
        return deletedCampaign
    }

}