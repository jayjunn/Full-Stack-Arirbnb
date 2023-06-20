import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { NextResponse } from 'next/server';

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
