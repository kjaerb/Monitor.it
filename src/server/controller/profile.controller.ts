import { prisma } from '@/utils/prisma';
import { Figathlete } from '@prisma/client';
import { TRPCError } from '@trpc/server';

export async function getProfile(email: string) {
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
      code: 'NOT_FOUND',
      message: 'User not found',
    });
  }

  if (!user?.profile) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Profile not found',
    });
  }

  return user.profile;
}

interface createProfileProps {
  email: string;
  figAthlete?: Figathlete | null;
  role: string;
  sport: string;
}

export async function createProfile({
  email,
  figAthlete,
  role,
  sport,
}: createProfileProps) {
  const profile = await prisma.profile.create({
    data: {
      role,
      sport,
      user: {
        connect: {
          email,
        },
      },
    },
  });

  if (!profile) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Profile not found',
    });
  }

  if (profile && figAthlete) {
    await prisma.figathlete.create({
      data: {
        idgymnastlicense: figAthlete.idgymnastlicense,
        gymnastid: figAthlete.gymnastid,
        discipline: figAthlete.discipline,
        validto: figAthlete.validto,
        licensestatus: figAthlete.licensestatus,
        figImgUrl: figAthlete.figImgUrl,
        preferredlastname: figAthlete.preferredlastname,
        preferredfirstname: figAthlete.preferredfirstname,
        birth: figAthlete.birth,
        country: figAthlete.country,
        gender: figAthlete.gender,
        createdAt: figAthlete.createdAt,
        updatedAt: figAthlete.updatedAt,
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });
  }

  return profile;
}
