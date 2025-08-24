import type { ReactNode } from 'react';
import { Background } from './Background';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Background />
      <div>
        {children}
      </div>
    </>
  );
};