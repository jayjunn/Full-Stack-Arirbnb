'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu, AiOutlineGlobal } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { User } from '@/app/types';
import useRentModal from "@/app/hooks/useRentModal'";

interface IUserMenu {
  currentUser: User | null;
}

export default function UserMenu({ currentUser }: IUserMenu) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const handleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuClick = useCallback(
    (path: string) => {
      router.push(path);
      setIsOpen(false);
    },
    [router]
  );

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isOpen && !menuRef?.current?.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center ">
        <div
          className=" hidden
        md:block
        text-sm 
        font-semibold 
        py-3 
        px-4 
        rounded-full 
        hover:bg-neutral-100 
        transition 
        cursor-pointer
      "
          onClick={rentModal.onOpen}>
          Airbnb your home
        </div>
        <button
          className="hidden md:block hover:bg-neutral-100 rounded-full p-3 mr-2
        ">
          <AiOutlineGlobal size="20" />
        </button>
        <button
          onClick={handleOpen}
          className="p-4
        md:py-1
        md:px-2
        border-[1px] 
        border-neutral-200 
        flex 
        flex-row 
        items-center 
        gap-3 
        rounded-full 
        cursor-pointer 
        hover:shadow-md 
        transition
      ">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className="
        absolute 
        rounded-xl 
        shadow-md
        w-[40vw]
        md:w-3/4 
        bg-white 
        overflow-hidden 
        right-0 
        top-12 
        text-sm
      ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <>
                  <MenuItem label="My trips" onClick={() => handleMenuClick('/trips')} />
                  <MenuItem label="My favorites" onClick={() => handleMenuClick('/favorites')} />
                  <MenuItem label="My reservations" onClick={() => handleMenuClick('/reservations')} />
                  <MenuItem label="My properties" onClick={() => handleMenuClick('/properties')} />
                  <MenuItem label="Airbnb your home" onClick={rentModal.onOpen} />
                  <hr />
                  <MenuItem label="Logout" onClick={() => signOut()} />
                </>
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
                <hr />
                <MenuItem label="Airbnb your home" />
                <MenuItem label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
