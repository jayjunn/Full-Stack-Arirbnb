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

export { getListings, getFavoriteListings };
