// src/server/router/index.ts

import { TRPCError } from '@trpc/server';
import superjson from 'superjson';

import { createRouter } from '@/server/createRouter';

import { profileRouter } from './profile.router';
import { trainingRouter } from './training.router';
import { userRouter } from './user.router';
import { useRouter } from 'next/router';

export const appRouter = createRouter()
  .query('getSession', {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  })
  .transformer(superjson)
  .merge('user.', userRouter)
  .merge('profile.', profileRouter)
  .merge('training.', trainingRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
