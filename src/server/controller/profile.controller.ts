import { TRPCError } from "@trpc/server";

export async function getProfile(email: string) {
  const user = await prisma?.user.findFirst({
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
      message: "User not found",
    });
  }

  return user.profile;
}

interface createProfileProps {
  email: string;
  role: string;
  sport: string;
  figLicense?: number | null;
}

export async function createProfile({
  email,
  role,
  sport,
  figLicense,
}: createProfileProps) {
  const user = await prisma?.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  const profile = await prisma?.profile.create({
    data: {
      role,
      sport,
      figLicense,
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return profile;
}
