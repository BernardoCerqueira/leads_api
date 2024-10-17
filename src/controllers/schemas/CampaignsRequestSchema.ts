import { z } from "zod";

export const CreateCampaignRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    startDate: z.coerce.date().default(new Date()),
    endDate: z.coerce.date().optional() 
})

export const UpdateCampaignRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    startDate: z.date().default(new Date()).optional(),
    endDate: z.date().optional()
})

const LeadCampaignStatusSchema = z.enum([
    "New",
    "Engaged",
    "FollowUp_Scheduled",
    "Contacted",
    "Qualified",
    "Converted",
    "Unresponsive",
    "Disqualified",
    "Re_Engaged",
    "Opted_Out"
])

export const GetCampaignLeadsRequestSchema = z.object({
    page: z.string().optional(),
    pageSize: z.string().optional(),
    name: z.string().optional(),
    status: LeadCampaignStatusSchema.optional(),
    sortBy: z.enum(["name", "createdAt", "id"]).optional(),
    order: z.enum(["asc", "desc"]).optional()
})

export const AddLeadRequestSchema = z.object({
    leadId: z.number(),
    status: LeadCampaignStatusSchema.optional()
})

export const UpdateLeadStatusRequestSchema = z.object({
    status: LeadCampaignStatusSchema
})