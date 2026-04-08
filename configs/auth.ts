import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    bio?: string;     
    createdAt?: string; 
  }
  interface Session {
    user: User;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    name?: string;
    email?: string;
    bio?: string;     
    createdAt?: string;
    error?: string;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) throw data;

    return {
      ...token,
      accessToken: data.token, 
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, 
      error: undefined,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const loginData = await loginRes.json();
          if (!loginRes.ok) return null;

          const token = loginData.token;

          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/me`, {
            headers: { "Authorization": `Bearer ${token}` },
          });

          if (!profileRes.ok) return null;
          const profileData = await profileRes.json();

          return {
            id: profileData.id,
            name: profileData.username || credentials.email.split('@')[0],
            email: credentials.email,
            accessToken: token, 
            refreshToken: loginData.refreshToken,
            accessTokenExpires: Date.now() + 60 * 60 * 1000, 
            bio: profileData.bio,
            createdAt: profileData.createdAt
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          name: user.name,
          email: user.email,
          bio: user.bio,
          createdAt: user.createdAt,
        };
      }

      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }

      if (Date.now() < (token.accessTokenExpires as number) - 10000) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.bio = token.bio as string;
        session.user.createdAt = token.createdAt as string;
        session.user.accessTokenExpires = token.accessTokenExpires as number;
        session.error = token.error as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
      },
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};