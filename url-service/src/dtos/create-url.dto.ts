import { z } from 'zod';

export const createUrlSchema = z.object({
  originalUrl: z.string().url('Invalid URL format'),
});

export type CreateUrlDto = z.infer<typeof createUrlSchema>;
