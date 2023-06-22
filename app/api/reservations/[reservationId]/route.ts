import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  reservationId: string;
}

export const DELETE = async (request: Request, { reservationId }: IParams) => {
  const currentUser = await getCurrentUser();
  console.log('reservationId', reservationId);

  if (!currentUser) {
    return NextResponse.error();
  }

  if (!reservationId) {
    throw new Error('Invalid Id');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: { id: reservationId },
  });

  return NextResponse.json(reservation);
};
