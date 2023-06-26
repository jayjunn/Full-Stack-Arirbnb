import getCurrentUser from '@/app/actions/getCurrentUser';
import { getListingById } from '@/app/actions/getList';
import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';
import { getReservations } from '@/app/actions/getReservations';

interface IParams {
  listingId?: string;
}

export default async function Listing({ params }: { params: IParams }) {
  const listing = await getListingById(params.listingId);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />;
}
