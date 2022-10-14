// src/server/router/context.ts
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "@/utils/prisma";
import * as trpc from "@trpc/server";
import { unstable_getServerSession as getServerSession } from "next-auth";

import { authOptions as nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>;

export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    prisma,
  };
};

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req;
  const res = opts?.res;

  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions));

  const contextInner = await createContextInner({});

  return {
    req,
    res,
    session,
    contextInner,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
