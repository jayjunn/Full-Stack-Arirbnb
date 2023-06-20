import React from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { getFavoriteListings } from '../actions/list';
import ListingCard from '../components/listings/ListingCard';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

export default async function Favorites() {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (!listings) {
    return <EmptyState />;
  }

  return (
    <ClientOnly>
      <Container>
        <Heading title={'Favorites'} subtitle="List of places you have favorited" />
        <div
          className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        ">
          {listings.map((listing: any) => (
            <ListingCard currentUser={currentUser} key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
