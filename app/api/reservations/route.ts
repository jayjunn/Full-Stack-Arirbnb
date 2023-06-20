import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();

  const { totalPrice, startDate, endDate, listingId } = body;

  if (!totalPrice || !startDate || !endDate || !listingId) {
    return NextResponse.error();
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice,
          startDate,
          endDate,
        },
      },
    },
  });

  return NextResponse.json(updatedListing);
}
