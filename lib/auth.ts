import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { env } from "./env";

const fixedPrismaAdapter = prismaAdapter(db, {
  provider: "postgresql",
  mapUser: (user) => ({
    ...user,
    // Ako je boolean, pretvori u null ili Date
    emailVerified:
      typeof user.emailVerified === "boolean" ? null : user.emailVerified,
  }),
});

export const auth = betterAuth({
  database: fixedPrismaAdapter,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});

export type Session = typeof auth.$Infer.Session;

export type User = typeof auth.$Infer.Session.user;
