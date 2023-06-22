import React from 'react';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import { getReservations } from '../actions/getReservations';
import TripsClient from '../trips/TripsClient';

type Props = {};

const Reservations = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Seems like you are not logged in" subtitle="Please login first" showLogin={true} />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties." />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Reservations;
