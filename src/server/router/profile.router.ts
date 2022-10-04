import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createProfile,
  getProfileByEmail,
  getProfileNames,
} from "../controller/profile.controller";
import { createRouter } from "../createRouter";

export const profileRouter = createRouter()
  .query("getProfile", {
    async resolve({ ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not logged in.",
        });
      }

      const result = await getProfileByEmail(email);

      return { result };
    },
  })
  .query("getProfileByEmail", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ input: { email }, ctx }) {
      const result = await getProfileByEmail(email);

      return { result };
    },
  })
  .query("getProfileNames", {
    async resolve({ ctx }) {
      const result = await getProfileNames();

      return { result };
    },
  })
  .mutation("createProfile", {
    input: z.object({
      name: z.string(),
      role: z.string(),
      sport: z.string(),
    }),
    async resolve({ input: { name, role, sport }, ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to access this resource.",
        });
      }

      const result = await createProfile({ name, email, sport, role });

      return { result };
    },
  });
