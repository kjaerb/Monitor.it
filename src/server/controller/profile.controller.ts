import { Roles } from "@/types/roles";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/lib/prisma";

export async function getProfileByEmail(email: string) {
  return await prisma.profile.findFirst({
    where: {
      email,
    },
  });
}

export async function getProfileNames() {
  return await prisma.profile.findMany();
}

interface createProfileProps {
  name: string;
  email: string;
  role: string;
  sport: string;
}

export async function createProfile({
  name,
  email,
  sport,
  role,
}: createProfileProps) {
  const user = await prisma.user.findFirst({
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
  }

  return await prisma.profile.create({
    data: {
      img: user.image,
      sport,
      email,
      name,
      role,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });
}
