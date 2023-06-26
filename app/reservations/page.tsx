import React from 'react';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import { getReservations } from '../actions/getReservations';
import TripsClient from '../trips/TripsClient';

type Props = {};

const Reservations = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Seems like you are not logged in" subtitle="Please login first" showLogin={true} />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState title="No reservations found" subtitle="Looks like you have no reservations on your properties." />;
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default Reservations;
