import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

interface ProfileData {
  id: string;
  username?: string;
  email?: string;
  bio?: string;
  createdAt?: string;
  avatarUrl?: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  error?: string;
}

interface RefreshResponse {
  token: string;
  refreshToken?: string;
  error?: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
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
    name?: string | null;
    email?: string | null;
    image?: string | null;
    bio?: string;
    createdAt?: string;
    error?: string;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("[NEXT-AUTH] Refreshing token...");
    console.log("[NEXT-AUTH] API URL:", process.env.NEXT_PUBLIC_API_URL);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    console.log("[NEXT-AUTH] Refresh response status:", response.status);

    const data = (await response.json()) as RefreshResponse;

    if (!response.ok) {
      console.error("[NEXT-AUTH] Refresh token failed", data);
      throw new Error(data.error ?? "RefreshAccessTokenError");
    }

    console.log("[NEXT-AUTH] Token refreshed successfully");

    return {
      ...token,
      refreshToken: data.refreshToken ?? token.refreshToken,
      accessToken: data.token,
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
        if (!credentials?.email || !credentials?.password) {
          console.error("[NEXT-AUTH] Missing credentials");
          return null;
        }

        try {
          console.log("[NEXT-AUTH] Attempting login for:", credentials.email);
          console.log("[NEXT-AUTH] API URL:", process.env.NEXT_PUBLIC_API_URL);

          const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          console.log("[NEXT-AUTH] Login response status:", loginRes.status);

          const loginData = (await loginRes.json()) as LoginResponse;
          
          if (!loginRes.ok) {
            console.error("[NEXT-AUTH] Login failed:", loginData);
            throw new Error(loginData.error ?? "Login failed");
          }

          const token = loginData.token;

          if (!token) {
            console.error("[NEXT-AUTH] No token received from backend");
            return null;
          }

          console.log("[NEXT-AUTH] Token received, fetching profile...");

          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/me`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
            },
          });

          console.log("[NEXT-AUTH] Profile response status:", profileRes.status);

          let userId = "";
          let profileData: ProfileData | null = null;

          if (profileRes.ok) {
            profileData = await profileRes.json() as ProfileData;
            userId = profileData?.id ?? "";
            console.log("[NEXT-AUTH] Profile fetched, userId:", userId);
          } else {
            const errorText = await profileRes.text();
            console.error("[NEXT-AUTH] Failed to fetch profile:", errorText);
          }

          if (!userId) {
            console.error("[NEXT-AUTH] UUID not found via /me");
            return null;
          }

          return {
            id: userId,
            name: profileData?.username ?? credentials.email.split('@')[0],
            email: credentials.email,
            image: profileData?.avatarUrl,
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
      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
          name: user.name,
          email: user.email,
          image: user.image,
          bio: user.bio,
          createdAt: user.createdAt,
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          name: session.user.name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          email: session.user.email ?? token.email,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          image: session.user.image ?? token.image,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          bio: session.user.bio ?? token.bio,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          createdAt: session.user.createdAt ?? token.createdAt,
        };
      }

      if (!token.accessTokenExpires || Date.now() < token.accessTokenExpires - 10000) {
        if (token.error === "RefreshAccessTokenError") {
          return { ...token };
        }
        return token;
      }

      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token.error === "RefreshAccessTokenError") {
        return {
          ...session,
          error: "RefreshAccessTokenError",
          user: null!,
        };
      }

      if (session.user) {
        session.user.id = token.id;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name ?? undefined;
        session.user.email = token.email ?? "";
        session.user.image = token.image ?? undefined;
        session.user.bio = token.bio;
        session.user.createdAt = token.createdAt;
        session.user.accessTokenExpires = token.accessTokenExpires;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};