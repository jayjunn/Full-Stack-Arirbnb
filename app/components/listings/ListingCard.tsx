'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useCountries from '@/app/hooks/useCountries';
import { Listing, User, Reservation } from '@/app/types';
import { format } from 'date-fns';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface IListingCard {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
  showHeart?: boolean;
}

const ListingCard = ({ data, onAction, disabled, actionLabel, actionId = '', currentUser, reservation, showHeart = true }: IListingCard) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div onClick={() => router.push(`/listings/${data.id}`)} className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          ">
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            priority={true}
            sizes="100%"
            src={data.imageSrc}
            alt="Listing"
          />
          {showHeart && (
            <div className=" absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          )}
        </div>
        <div className="font-semibold text-lg">
          {location?.label}, {location?.region}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="flex">
            <h3 className="font-semibold">$ {data.price}</h3>
            <span> &nbsp;{` / night`} </span>
          </div>
        </div>
        {onAction && actionLabel && <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />}
      </div>
    </div>
  );
};

export default ListingCard;
