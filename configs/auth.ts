import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        if (!res.ok) return null;

        const data = await res.json();

        const expiresIn = data.expiresIn ?? 15 * 60; 

        return {
          id: data.user?.id ?? credentials.email,
          email: credentials.email,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          accessTokenExpires: Date.now() + expiresIn * 1000,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, 
    updateAge: 10 * 60, 
  },

  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: (user as any).accessToken,
          refreshToken: (user as any).refreshToken,
          accessTokenExpires: (user as any).accessTokenExpires,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).refreshToken = token.refreshToken;
        (session.user as any).error = token.error;
      }
      return session;
    },
  },
};

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error ?? "Ошибка обновления токена");
    }

    const expiresIn = data.expiresIn ?? 15 * 60;

    return {
      ...token,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + expiresIn * 1000,
    };
  } catch (error) {
    console.error("Ошибка обновления токена:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
