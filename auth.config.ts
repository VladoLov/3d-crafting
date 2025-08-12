import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { env } from "./lib/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "./lib/generated/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Pronađite account s ispravnim emailom i providerom "credentials"
        const account = await prisma.account.findFirst({
          where: {
            provider: "credentials",
            providerAccountId: credentials?.email as string, // Koristimo email kao jedinstveni identifikator
          },
          include: {
            user: true, // Uključite korisnika za povratak
          },
        });

        // Provjerite postoji li account i je li lozinka ispravna
        if (
          account &&
          account.password && // Provjerite da li polje 'password' postoji
          bcrypt.compareSync(
            (credentials?.password as string) || " ",
            account.password
          )
        ) {
          // Ako je lozinka ispravna, vratite korisnika
          return {
            id: account.user.id,
            name: account.user.name,
            email: account.user.email,
            image: account.user.image,
            role: account.user.role as "user" | "admin", // Dodajte rolu korisnika
          };
        }

        return null; // Neispravni podaci
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    // 1. JWT Callback
    // Dodaje rolu korisnika u JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      } else if (!token.id) {
        // Ako ID ne postoji, dohvatimo iz baze preko emaila
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email as string },
        });
        if (existingUser) {
          token.id = existingUser.id;
          token.role = existingUser.role;
        }
      }
      return token;
    },
    // 2. Session Callback
    // Dodaje rolu iz JWT tokena u session objekt
    async session({ session, token }) {
      if (token?.role || token?.id) {
        session.user.id = token.id; // Dodaje ID korisnika u session
        // Proširuje session.user s rolom iz tokena
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
