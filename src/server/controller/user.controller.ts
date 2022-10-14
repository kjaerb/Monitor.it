import { prisma } from "@/utils/prisma";

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
