import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import { getListings } from '../actions/getList';
import PropertiesClient from './PropertiesClient';

type Props = {};

const Properties = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Seems like you are not logged in" subtitle="Please login first" showLogin={true} />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length <= 0) {
    return <EmptyState title="No properties found" subtitle="Looks like you have no properties." />;
  }
  return <PropertiesClient listings={listings} />;
};

export default Properties;
