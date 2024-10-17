import { Handler } from "express";
import { CreateCampaignRequestSchema, UpdateCampaignRequestSchema } from "./schemas/CampaignsRequestSchema";
import { CampaignsService } from "../services/CampaignsService";

export class CampaignController {
    constructor(private readonly campaignsService: CampaignsService){}

    index: Handler = async (req, res, next) => {
        try {
            const campaigns = await this.campaignsService.getAllCampaigns()
            res.json(campaigns)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignRequestSchema.parse(req.body)
            const newCampaing = await this.campaignsService.createCampaign(body)
            res.status(201).json(newCampaing)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignsService.getCampaignById(+req.params.id)
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.id
            const body = UpdateCampaignRequestSchema.parse(req.body)
            const updatedCampaign = await this.campaignsService.updateCampaign(campaignId, body)
            res.json(updatedCampaign)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.id
            const deletedCampaign = await this.campaignsService.deleteCampaign(campaignId)
            res.json(deletedCampaign)
        } catch (error) {
            next(error)
        }
    }
}