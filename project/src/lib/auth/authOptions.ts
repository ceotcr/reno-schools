import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../prisma";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "otp-signin",
      name: "OTP Sign In",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Missing credentials");
        const otp = await prisma.otp.findFirst({
          where: { email: credentials.email, code: credentials.otp },
        });
        if (!otp || otp.expiresAt < new Date()) throw new Error("Invalid or expired OTP");
        await prisma.otp.deleteMany({ where: { email: credentials.email } });
        let user = await prisma.user.findFirst({ where: { email: credentials.email } });
        if (!user) {
          user = await prisma.user.create({ data: { email: credentials.email } });
        }
        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      const newUrl = new URL(url);
      const callbackUrl = newUrl.searchParams.get("callbackUrl");
      if (callbackUrl) {
        return callbackUrl;
      }
      if (newUrl.searchParams.get("error")) {
        return url;
      }
      const token = newUrl.searchParams.get("token");
      if (token) {
        const user = await prisma.user.findFirst({
          where: {
            id: parseInt(token),
          },
        });
        if (user && !user.name) {
          return `${baseUrl}/user`;
        }
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
};
