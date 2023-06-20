'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';
import Heading from './Heading';
import ClientOnly from './ClientOnly';

interface IEmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({ title = 'No exact matches', subtitle = 'Try changing or removing some of your filters.', showReset = false }: IEmptyState) => {
  const router = useRouter();
  return (
    <ClientOnly>
      <div
        className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      ">
        <Heading center title={title} subtitle={subtitle} />
        <div className="w-48 mt-4">{showReset && <Button outline label="Remove all filters" onClick={() => router.push('/')} />}</div>
      </div>
    </ClientOnly>
  );
};

export default EmptyState;
