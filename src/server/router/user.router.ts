import { z } from "zod";
import { createRouter } from "@/server/createRouter";
import {
  getUserByEmail,
  updateUserImage,
} from "@/server/controller/user.controller";
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
  .mutation("updateUserImage", {
    input: z.object({
      imageURL: z.string(),
    }),
    async resolve({ ctx, input: { imageURL } }) {
      const email = ctx.session?.user?.email;

      if (!email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to access this resource.",
        });
      }

      const user = await updateUserImage(email, imageURL);

      return { user };
    },
  });
