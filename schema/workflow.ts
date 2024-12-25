import {z} from 'zod';

export const Workflow = z.object({
    name: z.string().max(50),
    description: z.string().max(200).optional(),
});

export type WorkflowSchemaType = z.infer<typeof Workflow>;