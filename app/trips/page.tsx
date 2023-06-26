import React from 'react';
import { getReservations } from '../actions/getReservations';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import TripsClient from './TripsClient';

export default async function Trips() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Seems like you are not logged in" subtitle="Please login first" showLogin={true} />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips." />;
  }

  return <TripsClient currentUser={currentUser} reservations={reservations} />;
}
