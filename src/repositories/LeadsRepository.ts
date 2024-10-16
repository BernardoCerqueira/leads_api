import { Campaign, Lead, LeadCampaignStatus } from "@prisma/client";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Converted" | "Unresponsive" | "Disqualified" | "Archived"

export interface LeadWhereParams {
    name?: {
        like?: string
        equals?: string
        mode?: "default" | "insensitive"
    }
    status?: LeadStatus,
    groupId?: number
    campaignId?: number
}

export interface FindLeadsParams {
    where?: LeadWhereParams
    sortBy?: "name" | "status" | "createdAt" | "id"
    order?: "asc" | "desc"
    limit?: number
    offset?: number
    include?: {
        groups?: boolean
        campaigns?: boolean
    }
}

export interface CreateLeadAttributes{
    name: string
    email: string
    phone: string
    status?: LeadStatus
}

export interface LeadsRepository {
    find: (params: FindLeadsParams) => Promise<Lead[]>
    findById: (id: number) => Promise<Lead | null>
    count: (where: LeadWhereParams) => Promise<number>
    create: (attributes: CreateLeadAttributes) => Promise<Lead>
    deleteById: (id: number) => Promise<Lead | null>
    updateById: (id: number, attributes: Partial<CreateLeadAttributes>) => Promise<Lead | null>
}