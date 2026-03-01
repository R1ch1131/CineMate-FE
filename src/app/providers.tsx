'use client';

import type { ReactNode } from 'react';
import { Layout } from '~/widgets/Layout/ui/Layout';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // опционально

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // данные считаются свежими 5 минут
      gcTime: 10 * 60 * 1000,        // время хранения в кэше после использования
      refetchOnWindowFocus: false,   // не перезапрашивать при фокусе окна
    },
  },
});

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Layout>
          {children}
        </Layout>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};