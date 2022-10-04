import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export async function getTrainingById(id: string) {
  return await prisma.training.findUnique({
    where: {
      id,
    },
  });
}

export async function get30LatestTrainings(email: string) {
  const profile = await prisma.profile.findFirst({
    where: {
      email,
    },
  });

  if (!profile) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Profile not found",
    });
  }

  return await prisma.training.findMany({
    take: 30,
    where: {
      profileId: email,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
