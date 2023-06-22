import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import { getListings } from '../actions/getList';
import PropertiesClient from './PropertiesClient';

type Props = {};

const Properties = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Seems like you are not logged in" subtitle="Please login first" showLogin={true} />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length <= 0) {
    return (
      <ClientOnly>
        <EmptyState title="No properties found" subtitle="Looks like you have no properties." />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} />
    </ClientOnly>
  );
};

export default Properties;
