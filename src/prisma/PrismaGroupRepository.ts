import { Group } from "@prisma/client";
import { CreatGroupAttributes, GroupRepository } from "../repositories/GroupRepository";
import { prisma } from "../database";

export class PrismaGroupsRepository implements GroupRepository{
    find(): Promise<Group[]>{
        return prisma.group.findMany()
    }
    
    findById(id: number): Promise<Group | null>{
        return prisma.group.findUnique({
            where: {id},
            include: {
                leads: true
            }
        })
    }

    create(attributes: CreatGroupAttributes): Promise<Group>{
        return prisma.group.create({data: attributes})
    }

    updateById(id: number, attributes: Partial<CreatGroupAttributes>): Promise<Group | null>{
        return prisma.group.update({
            where: {id},
            data: attributes
        })
    }

    deleteById(id: number): Promise<Group | null>{
        return prisma.group.delete({where: {id}})
    }

    addLead(groupId: number, leadId: number): Promise<Group>{
        return prisma.group.update({
            where: {id: groupId},
            data: {
                leads: {connect: {id: leadId}}
            },
            include: 
            {leads: {select: {id: true, name: true}}}
        })   
    }

    removeLead(groupId: number, leadId: number): Promise<Group>{
        return prisma.group.update({
            where: {id: groupId},
            data: {leads: {disconnect: {id: leadId}}},
            include: {leads: true}
        })
    }
}