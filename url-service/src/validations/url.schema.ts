import { createUrlSchema } from '@url-service/dtos/create-url.dto';
import { z } from 'zod';

export const createSchema = z.object({
  body: createUrlSchema,
});

export const getByShortCodeSchema = z.object({
  params: z.object({
    shortCode: z.string().min(3),
  }),
});

export const getUserUrlsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
  }),
});

export const deleteUrlSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});
