import { TRPCError } from '@trpc/server';

import { prisma } from '@/utils/prisma';

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      profile: true,
    },
  });

  return user;
}

export async function updateUserImage(email: string, imageURL: string) {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      image: imageURL,
    },
  });

  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found',
    });
  }

  return user;
}
