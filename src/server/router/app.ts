// src/server/router/index.ts

import { TRPCError } from "@trpc/server";
import superjson from "superjson";
import { createRouter } from "../createRouter";
import { profileRouter } from "./profile.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .transformer(superjson)
  .merge("user.", userRouter)
  .merge("profile.", profileRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
