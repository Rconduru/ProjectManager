import { z } from 'zod';

export const ProjectSaveSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(500),
});
