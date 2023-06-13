import prisma from '@/app/libs/prismadb';

const getListings = async () => {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const mappedListings = listings.map((item) => ({ ...item, createdAt: item.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }) }));
    return mappedListings;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getListings;
