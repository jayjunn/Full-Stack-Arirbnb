import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/app/libs/prismadb';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {z
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }),
      updatedAt: currentUser.updatedAt.toLocaleString('en-GB', { timeZone: 'UTC' }),
      emailVerified: currentUser.emailVerified?.toLocaleString('en-GB', { timeZone: 'UTC' }) || null,
    };
  } catch (error: any) {
    return null;
  }
}
