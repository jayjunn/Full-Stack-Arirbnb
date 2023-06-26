import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { NextResponse } from 'next/server';

export interface IListing {
  userId?: string;
  category?: string;
  roomCount?: number;
  guestCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
}
const getListings = async ({ userId, category, roomCount, guestCount, bathroomCount, startDate, endDate, locationValue }: IListing) => {
  try {
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    const listings = await prisma.listing.findMany({
      where: query,
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

const getFavoriteListings = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...currentUser.favoriteIds],
        },
      },
    });

    const mappedFavorites = favorites.map((favorites) => ({
      ...favorites,
      createdAt: favorites.createdAt.toLocaleString('en-GB', { timeZone: 'UTC' }),
    }));

    return mappedFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getListingById = async (listingId?: string) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    const mappedListing = {
      ...listing,
      createdAt: listing?.createdAt.toString(),
      user: {
        ...listing?.user,
        createdAt: listing?.user.createdAt.toString(),
        updatedAt: listing?.user.updatedAt.toString(),
        emailVerified: listing?.user.emailVerified?.toString() || null,
      },
    };
    return mappedListing ? mappedListing : null;
  } catch (error: any) {
    throw new Error(error);
  }
};

export { getListings, getFavoriteListings, getListingById };
