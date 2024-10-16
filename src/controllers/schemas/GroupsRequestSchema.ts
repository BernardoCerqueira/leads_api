import { z } from "zod";

export const FindGroupRequestSchema = z.object({
    sortBy: z.enum(["name", "id"])
})

export const CreateGroupRequestSchema = z.object({
    name: z.string(),
    description: z.string()
})

export const UpdateGroupRequestSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional()
})

export const CreateGroupLeadRequestSchema = z.object({
    id: z.string()
})
