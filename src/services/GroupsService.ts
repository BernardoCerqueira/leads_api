import { CreateGroupRequestSchema } from "../controllers/schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { CreatGroupAttributes, GroupRepository } from "../repositories/GroupRepository";

export class GroupsService{
    constructor(private readonly groupsRepository: GroupRepository){}

    async getAllGroups(){
     const groups = await this.groupsRepository.find()
     return groups
    }

    async getGroupById(groupId: number){
        const group = await this.groupsRepository.findById(groupId)
        if(!group) throw new HttpError(404, "Group not found.")
        return group
    }

    async createGroup(params: CreatGroupAttributes){
        const body = CreateGroupRequestSchema.parse(params)
        const newGroup = await this.groupsRepository.create(body)
        return newGroup
    }

    async updateGroup(groupId: number, body: Partial<CreatGroupAttributes>){
        await this.getGroupById(groupId)
        const updatedGroup = await this.groupsRepository.updateById(groupId, body)
        if(!updatedGroup) throw new HttpError(404, "Group not found.")
        return updatedGroup
    }

    async deleteGroup(groupId: number){
        await this.getGroupById(groupId)
        const deletedGroup = await this.groupsRepository.deleteById(groupId)
        if(!deletedGroup) throw new HttpError(404, "Group not found.")
        return deletedGroup
    }
}