import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET
    }),
    VkProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.debug('>> callback signIn', { user, account, profile, email, credentials });
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, user, token }) {
      // console.debug('>> callback session', { session, user, token });
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.nickname = user.nickname;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.debug('>> callback jwt', { token, user, account, profile, isNewUser });
      return token;
    }
  }
};

const resf = NextAuth(authOptions);

export default (...params) => {
  const [req] = params;
  // console.log('pages/api/auth/[...nextauth].js ');
  // console.log('>> ', req.method, ' запрос на', req.url, req.query);
  return resf(...params);
};