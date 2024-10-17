import { GroupRepository } from "../repositories/GroupRepository"
import { LeadsRepository, LeadStatus, LeadWhereParams } from "../repositories/LeadsRepository"

export interface GetAllLeadsFromGroupSchema{
    page?: number
    pageSize?: number
    name?: string
    status?: LeadStatus,
    sortBy?: "name" | "id" | "status" | "createdAt",
    order?: "asc" | "desc"
}

export class GroupLeadsService{
    constructor(
        private readonly leadsRepository: LeadsRepository,
        private readonly groupsRepository: GroupRepository
    ){}

    async getAllLeadsFromGroup(groupId: number, query: GetAllLeadsFromGroupSchema){
        const {name, status, page = 1, pageSize = 10, sortBy, order} = query
        const limit = +pageSize
        const offset = (Number(page) - 1) * limit

        const where: LeadWhereParams = {groupId}
        if(name) where.name = {like: String(name), mode: "insensitive"}

        const leads = await this.leadsRepository.find({
            where,
            sortBy,
            order,
            limit, 
            offset,
            include: {groups: true}
        })

        const total = await this.leadsRepository.count(where)
        return {leads, total}
    }

    async addLeadToGroup(groupId: number, leadId: number){
        const updatedGroup = await this.groupsRepository.addLead(groupId, leadId)
        return updatedGroup
    }

    async removeLeadFromGroup(groupId: number, leadId: number){
        const deletedLead = await this.groupsRepository.removeLead(groupId, leadId)
        return deletedLead
    }
}