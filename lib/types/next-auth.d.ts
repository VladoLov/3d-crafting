// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role?: "user" | "admin";
  }
  /*  interface Session {
    user: {
      role?: "user" | "admin";
      role?: string;
    } & DefaultSession["user"];
  } */
  declare module "next-auth/jwt" {
    // Proširivanje postojećeg 'JWT' tipa
    interface JWT {
      role?: string;
    }
  }
}
