'use client';

import { usePathname } from 'next/navigation';

export const useActivePath = (): string => {
  const pathname = usePathname();
  return pathname || '/';
};