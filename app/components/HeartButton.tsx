'use client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { User } from '@/app/types';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const { isFavorite, toggleFavorite } = useFavorite({ listingId, currentUser });

  return (
    <button
      onClick={(e) => toggleFavorite(e)}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      ">
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart size={24} className={isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </button>
  );
};

export default HeartButton;
