import { z } from "zod";
import { createRouter } from "../createRouter";
import {
  getUserByEmail,
  updateUserProfile,
} from "../controller/user.controller";
import { TRPCError } from "@trpc/server";

export const userRouter = createRouter()
  .query("getUser", {
    async resolve({ ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to access this resource.",
        });
      }
      const user = await getUserByEmail(email);

      return { user };
    },
  })
  .mutation("updateUserProfile", {
    input: z.object({
      role: z.string(),
      athletes: z.string().array(),
    }),
    async resolve({ input: { role }, ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to access this resource.",
        });
      }
      const result = await updateUserProfile(role, email);

      return { result };
    },
  });
