'use client';

import type { ReactNode } from "react";
import { Layout } from '../widgets/Layout/ui/Layout';
import { SessionProvider } from "next-auth/react";


export const Providers = ({ children }: { children: ReactNode }) => {
  return  <Layout>
            <SessionProvider>
              {children}
            </SessionProvider>
          </Layout>;
};