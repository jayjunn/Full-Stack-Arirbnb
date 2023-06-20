import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

const getReservations = async (params: IParams) => {
  try {
    const { listingId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return mappedReservations;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getReservations };
