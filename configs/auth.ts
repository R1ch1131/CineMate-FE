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

const formatToken = (token: string) => {
  if (!token) return "null";
  return `${token.substring(0, 10)}...${token.substring(token.length - 10)}`;
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const text = await response.text(); 
    if (!text) throw new Error("Empty response");
    const data = JSON.parse(text);

    if (!response.ok) throw data;

    return {
      ...token,
      accessToken: data.token, 
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 15 * 60 * 1000, 
      error: undefined,
    };
  } catch (error) {
    console.error("[NEXT-AUTH] Refresh error:", error);
    return { ...token, error: "RefreshAccessTokenError" };
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Login failed");

          return {
            id: credentials.email,
            email: credentials.email,
            name: data.username,
            bio: data.bio,           
            createdAt: data.createdAt, 
            accessToken: data.token, 
            refreshToken: data.refreshToken,
            accessTokenExpires: Date.now() + 15 * 60 * 1000, 
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
        console.log("🔄 [JWT UPDATE] Обновляем поля:", Object.keys(session.user));
        return {
          ...token,
          name: session.user.name ?? token.name,
          email: session.user.email ?? token.email,
          bio: session.user.bio ?? token.bio,
          createdAt: session.user.createdAt ?? token.createdAt,
        };
      }

      // ПРОВЕРКА ВРЕМЕНИ
      if (Date.now() < token.accessTokenExpires - 10000) {
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.bio = token.bio;
        session.user.createdAt = token.createdAt;
        session.error = token.error;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};