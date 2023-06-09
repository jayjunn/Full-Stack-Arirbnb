'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu, AiOutlineGlobal } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

export default function UserMenu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

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
      ">
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
            <Avatar src={null} />
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
            <>
              <MenuItem label="Login" />
              <MenuItem label="Sign up" />
              <hr />
              <MenuItem label="Airbnb your home" />
              <MenuItem label="Help" />
            </>
          </div>
        </div>
      )}
    </div>
  );
}
