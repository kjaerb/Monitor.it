import { Roles } from "@/types/roles";
import { TRPCError } from "@trpc/server";
import { prisma } from "@/utils/prisma";

export async function getProfileByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  if (!user?.profile) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Profile not found",
    });
  }

  return user.profile;
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
}: createProfileProps) {}
