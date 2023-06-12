import { Listing, Reservation, User as DbUser } from '@prisma/client';

export type User = Omit<DbUser, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
