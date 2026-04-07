'use client';

import { useEffect, type ReactNode } from 'react';
import { Layout } from '~/widgets/Layout/ui/Layout';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 * Внутренний компонент для обработки событий безопасности
 */
const AuthEventsHandler = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    // Если сервер пометил сессию ошибкой "RefreshAccessTokenError"
    if (session?.error === "RefreshAccessTokenError") {
      console.warn("⚠️ [FRONTEND] Обнаружена ошибка токена. Выход...");
      signOut({ callbackUrl: "/" });
      return;
    }

    // Если user стал null из-за ошибки рефреша
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
        {/* Обработчик должен быть ВНУТРИ SessionProvider */}
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