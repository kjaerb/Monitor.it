import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProfile, getProfile } from "../controller/profile.controller";
import { createRouter } from "../createRouter";

export const profileRouter = createRouter()
  .query("getProfile", {
    async resolve({ ctx }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view your profile",
        });
      }

      const result = await getProfile(email);

      return { result };
    },
  })
  .mutation("createProfile", {
    input: z.object({
      role: z.string(),
      sport: z.string(),
      figLicense: z.number().nullish(),
    }),
    async resolve({ ctx, input: { role, sport, figLicense } }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a profile",
        });
      }

      const result = await createProfile({
        email,
        role,
        sport,
        figLicense,
      });

      return { result };
    },
  });
