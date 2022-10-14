import { prisma } from "@/utils/prisma";
import { TRPCError } from "@trpc/server";

export async function getTrainingById(id: string) {
  return await prisma.training.findUnique({
    where: {
      id,
    },
  });
}

export async function get30LatestTrainings(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Profile not found",
    });
  }

  return await prisma.training.findMany({
    take: 30,
    where: {
      userId: email,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
