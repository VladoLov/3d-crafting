/* "use server";

import { signIn, signUp } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email("Unesite valjanu email adresu"),
  password: z.string().min(6, "Lozinka mora imati najmanje 6 znakova"),
});

const registerSchema = z
  .object({
    name: z.string().min(2, "Ime mora imati najmanje 2 znaka"),
    email: z.string().email("Unesite valjanu email adresu"),
    password: z.string().min(6, "Lozinka mora imati najmanje 6 znakova"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne poklapaju",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;
// Funkcija se pokreće na serveru
export async function loginWithEmail(data: LoginForm) {
  const result = await signIn.email({
    email: data.email,
    password: data.password,
  });

  if (result.error) {
    return { success: false, error: result.error.message };
  }

  revalidatePath("/");
  return { success: true };
}

// Slično i za register...
 */
