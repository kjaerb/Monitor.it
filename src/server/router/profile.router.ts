import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
  createProfile,
  getProfile,
} from '@/server/controller/profile.controller';
import { createRouter } from '@/server/createRouter';

export const profileRouter = createRouter()
  .query('getProfile', {
    async resolve({ ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to access this resource',
        });
      }

      const result = await getProfile(email);

      return { result };
    },
  })
  .mutation('createProfile', {
    input: z.object({
      role: z.string(),
      sport: z.string(),
      figAthlete: z
        .object({
          idgymnastlicense: z.number(),
          gymnastid: z.number(),
          discipline: z.string(),
          validto: z.date(),
          licensestatus: z.date(),
          figImgUrl: z.string(),
          preferredlastname: z.string(),
          preferredfirstname: z.string(),
          birth: z.date(),
          gender: z.string(),
          country: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          profileId: z.string(),
        })
        .nullish(),
    }),
    async resolve({ ctx, input: { figAthlete, role, sport } }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You must be logged in to access this resource',
        });
      }
      const result = await createProfile({ email, figAthlete, role, sport });

      return { result };
    },
  });
