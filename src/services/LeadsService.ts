import { HttpError } from "../errors/HttpError"
import { CreateLeadAttributes, LeadsRepository, LeadStatus, LeadWhereParams } from "../repositories/LeadsRepository"

interface GetLeadsWithPaginationParams{
    page?: number,
    pageSize?: number,
    name?: string,
    status?: LeadStatus,
    sortBy?: "name" | "status" | "id" | "createdAt",
    order?: "asc" | "desc"
}

export class LeadsService{
    constructor(private readonly leadsRepository: LeadsRepository){}

    async getAllLeadsPaginated(params: GetLeadsWithPaginationParams){
        const {name, status, page = 1, pageSize = 10, sortBy, order} = params

        //PAGINAÇÃO
        const pageNumber = page
        const limit = pageSize

        //FILTRO
        const where: LeadWhereParams = {}
        if (name) where.name = {like: name, mode: "insensitive"}
        if(status) where.status = status

        const leads = await this.leadsRepository.find({
            where,
            sortBy,
            order,
            limit,
            offset: (pageNumber - 1) * limit
        })
        const total = await this.leadsRepository.count(where)

        return {
            data: leads,
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    }

    async getLeadById(id: number){
        const lead = await this.leadsRepository.findById(id)
        if(!lead) throw new HttpError(404, "Lead not found.")
        return lead
    }

    async createLead(params: CreateLeadAttributes){
        if(!params.status) params.status = "New"
        const newLead = await this.leadsRepository.create(params)
        return newLead
    }

    async updateLead(leadId: number, params: Partial<CreateLeadAttributes>){
        const lead = await this.leadsRepository.findById(leadId)
        if (!lead) throw new HttpError(404, "Lead not found.")

        if(lead.status === "New" && params.status !== undefined && params.status !== "Contacted"){
            throw new HttpError(400, "A new lead must be contacted first so its status can be updated into other values.")
        }

        if(params.status && params.status === "Archived") {
            const now = new Date()
            const diffTime = Math.abs(now.getTime() - lead.updatedAt.getTime())
            const diffDays = Math.ceil(diffTime / (1000*60*60*24))
            if(diffDays < 180) throw new HttpError(400, `A lead can only be archived after 6 months of inativity.\nCurrent inativity time: ${diffDays} days.`)
        }

        const updatedLead = await this.leadsRepository.updateById(leadId, params)
        return updatedLead
    }

    async deleteLeadById(leadId: number){
        const leadExists = await this.leadsRepository.findById(leadId)
        if (!leadExists) throw new HttpError(404, "Lead not found.")
        const deletedLead = await this.leadsRepository.deleteById(leadId)
        return deletedLead
    }

}