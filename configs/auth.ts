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

    if (!response.ok) {
      console.error("[NEXT-AUTH] Refresh token failed", data);
      throw data;
    }

    // Если бэкенд прислал новый refreshToken, записываем его. 
    // Если нет (хотя при ротации должен), оставляем старый.
    return {
      ...token,
      accessToken: data.token, 
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000, 
      error: undefined,
    };
  } catch (error) {
    console.error("[NEXT-AUTH] Refresh Error:", error);
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
          if (!loginRes.ok) throw new Error(loginData.error || "Login failed");

          const token = loginData.token;

          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/me`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
            },
          });

          let userId = "";
          let profileData: any = null;

          if (profileRes.ok) {
            profileData = await profileRes.ok ? await profileRes.json() : null;
            userId = profileData?.id;
          }

          if (!userId) {
            console.error("[NEXT-AUTH] UUID not found via /me");
            return null;
          }

          return {
            id: userId,
            name: profileData?.username || credentials.email.split('@')[0],
            email: credentials.email,
            accessToken: token, 
            refreshToken: loginData.refreshToken,
            accessTokenExpires: Date.now() + 60 * 60 * 1000, 
            bio: profileData?.bio,
            createdAt: profileData?.createdAt
          };
        } catch (error) {
          console.error("[NEXT-AUTH] Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // 1. ПЕРВИЧНЫЙ ВХОД
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

      // 2. ОБНОВЛЕНИЕ ПРОФИЛЯ
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          name: session.user.name ?? token.name,
          email: session.user.email ?? token.email,
          bio: session.user.bio ?? token.bio,
          createdAt: session.user.createdAt ?? token.createdAt,
        };
      }

      // 3. ПРОВЕРКА ВРЕМЕНИ ЖИЗНИ
      // Если до конца жизни токена больше 10 секунд, просто возвращаем текущий
      if (Date.now() < token.accessTokenExpires - 10000) {
        return token;
      }

      // 4. ТОКЕН ИСТЕК — ЗАПУСКАЕМ РЕФРЕШ
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.bio = token.bio;
        session.user.createdAt = token.createdAt;
        session.user.accessTokenExpires = token.accessTokenExpires;
        session.error = token.error;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};