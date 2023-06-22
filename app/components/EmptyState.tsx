'use client';

import { useRouter } from 'next/navigation';
import Button from './Button';
import Heading from './Heading';
import ClientOnly from './ClientOnly';
import useLoginModal from '../hooks/useLoginModal';

interface IEmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
}

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
  showReset = false,
  showLogin = false,
}: IEmptyState) => {
  const router = useRouter();
  const loginModal = useLoginModal();

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
        <div className="w-48 mt-4">
          {showReset && <Button outline label="Remove all filters" onClick={() => router.push('/')} />}
          {showLogin && <Button outline label="Log In" onClick={loginModal.onOpen} />}
        </div>
      </div>
    </ClientOnly>
  );
};

export default EmptyState;
