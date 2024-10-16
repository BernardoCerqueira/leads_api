import { Handler } from "express";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { CampaignRepository } from "../repositories/CampaignRepository";

export class CampaignController {
    constructor(private readonly campaignRepository: CampaignRepository){}

    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignRepository.index()
            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSchema.parse(req.body)
            const newCampaing = await this.campaignRepository.create(body)
            res.status(201).json(newCampaing)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.id
            const campaign = await this.campaignRepository.show(campaignId)
            if (!campaign) throw new HttpError(404, "Campaign not found.")

            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.id
            const campaignExists = await this.campaignRepository.show(campaignId)
            if (!campaignExists) throw new HttpError(404, "Campaign not found.")

            const body = UpdateCampaignRequestSchema.parse(req.body)
            const updatedCampaign = await this.campaignRepository.update(campaignId, body)
            
            res.json(updatedCampaign)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.id
            const campaignExists = await this.campaignRepository.show(campaignId)
            if (!campaignExists) throw new HttpError(404, "Campaign not found.")

            const deletedCampaign = await this.campaignRepository.delete(campaignId)
            res.json(deletedCampaign)
        } catch (error) {
            next(error)
        }
    }
}