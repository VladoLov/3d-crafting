import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Ime je obavezno").max(100, "Ime je predugačko"),
});

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Neautorizirano" }, { status: 401 });
    }

    const body = await req.json();
    const { name } = UpdateProfileSchema.parse(body);

    await db.user.update({
      where: { id: user.id },
      data: { name },
    });

    return NextResponse.json({ message: "Profil je uspješno ažuriran" });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Greška pri ažuriranju profila" },
      { status: 500 }
    );
  }
}
