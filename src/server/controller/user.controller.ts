import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  });

  return user;
}

export async function updateUserProfile(role: string, email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found.",
    });
  } else if (!user.name) {
    user.name = "Anonymous";
  }

  if (!user.profile) {
    return await prisma.profile.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        role,
        email,
        name: user.name,
      },
    });
  } else {
    return await prisma.profile.update({
      where: {
        id: user.profile.id,
      },
      data: {
        role,
      },
    });
  }
}
