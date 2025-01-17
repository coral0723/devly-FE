// src/auth.ts
import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user) return false;
      
      // Google 로그인 후 개발자 타입 선택 페이지로 리다이렉트
      return '/selectDev';
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
  }
}

export const handler = NextAuth(authConfig)