import { Listing as DbListing, Reservation as DbReservation, User as DbUser } from '@prisma/client';

export type User = Omit<DbUser, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
export type Listing = Omit<DbListing, 'createdAt'> & {
  createdAt: string;
};

export type Reservation = Omit<DbReservation, 'startDate' | 'endDate' | 'createdAt'> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};
