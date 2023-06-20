import { User } from '@/app/types';
import React from 'react';
import Heading from '../Heading';
import useCountries from '@/app/hooks/useCountries';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface IListingHead {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser: User | null;
}
export default function ListingHead({ title, imageSrc, locationValue, id, currentUser }: IListingHead) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.label}, ${location?.region}`} />
      <div className="w-full h-[30vh] md:h-[70vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} fill className="object-cover w-full" alt="Image" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
