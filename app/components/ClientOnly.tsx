'use client';

import React, { useState, useEffect } from 'react';

interface IClientOnly {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: IClientOnly) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
