import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  get30LatestTrainings,
  getTrainingById,
} from '@/server/controller/training.controller';
import { createRouter } from '@/server/createRouter';

export const trainingRouter = createRouter()
  .query('getTrainingById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input: { id } }) {
      const result = await getTrainingById(id);

      return { result };
    },
  })
  .query('get30LatestTrainings', {
    async resolve({ ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to access this resource',
        });
      }

      const result = await get30LatestTrainings(email);

      return { result };
    },
  });
