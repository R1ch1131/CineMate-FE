'use client';

import { useEffect, type ReactNode } from 'react';
import { Layout } from '~/widgets/Layout/ui/Layout';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const AuthEventsHandler = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      console.warn("⚠️ [FRONTEND] Обнаружена ошибка токена. Выход...");
      signOut({ callbackUrl: "/" });
      return;
    }

    if (session && !session.user) {
      console.warn("⚠️ [FRONTEND] Сессия пуста. Выход...");
      signOut({ callbackUrl: "/" });
    }
  }, [session]);

  return <>{children}</>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,   
      gcTime: 10 * 60 * 1000,        
      refetchOnWindowFocus: false,   
    },
  },
});

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AuthEventsHandler>
          <Layout>
            {children}
          </Layout>
        </AuthEventsHandler>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};