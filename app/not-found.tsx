import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className="fixed w-full h-2/3 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-rose-500">Oops Page Not found 404</h1>
      <div className="p-1 mt-3 font-semibold text-rose-500 hover:transform  transform hover:scale-105 duration-500 ease-in-out">
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
}
