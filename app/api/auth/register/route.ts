/* import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = RegisterSchema.parse(body);

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
       const user = await db.user.create({
      data: {
        name,
        email,
        emailVerified: new Date(),
      },
    }); 

    // Create credentials account
    /*   await db.account.create({
      data: {
        userId: user.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: user.id,
        password: hashedPassword,
      },
    }); 

    /* return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }); 
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}*/

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = RegisterSchema.parse(body);

    // Provjera postoji li korisnik
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Korisnik sa ovim emailom već postoji" },
        { status: 400 }
      );
    }

    // Heširanje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kreiranje korisnika i računa u jednoj transakciji
    await db.user.create({
      data: {
        name,
        email,
        // Lozinka se ne sprema direktno na User model
        accounts: {
          create: {
            provider: "credentials",
            providerAccountId: email, // Koristimo email kao providerAccountId
            password: hashedPassword, // Spremanje heširane lozinke
            type: "credentials",
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Korisnik uspješno registriran" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Greška pri registraciji:", error);
    return NextResponse.json(
      { error: "Registracija neuspjela" },
      { status: 500 }
    );
  }
}
