import { Group } from "@prisma/client";

export interface CreatGroupAttributes{
    name: string
    description: string
}

export interface GroupRepository{
    find: () => Promise<Group[]>
    findById: (id: number) => Promise<Group | null>
    create: (attributes: CreatGroupAttributes) => Promise<Group>
    updateById: (id: number, attributes: Partial<CreatGroupAttributes>) => Promise<Group | null>
    deleteById: (id: number) => Promise<Group | null>
    addLead: (groupId: number, leadId: number) => Promise<Group>
    removeLead: (groupId: number, leadId: number) => Promise<Group>
}