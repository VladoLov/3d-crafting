"use client";

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "CredentialsSignin":
        return "Neispravni podaci za prijavu. Molimo provjerite email i lozinku.";
      case "OAuthSignin":
        return "Greška pri OAuth prijavi. Molimo pokušajte ponovo.";
      case "OAuthCallback":
        return "Greška pri OAuth callback-u. Molimo pokušajte ponovo.";
      case "OAuthCreateAccount":
        return "Greška pri stvaranju OAuth računa. Molimo pokušajte ponovo.";
      case "EmailCreateAccount":
        return "Greška pri stvaranju email računa. Molimo pokušajte ponovo.";
      case "Callback":
        return "Greška pri callback-u. Molimo pokušajte ponovo.";
      case "OAuthAccountNotLinked":
        return "Email je već povezan s drugim načinom prijave. Molimo koristite originalni način prijave.";
      case "EmailSignin":
        return "Greška pri slanju email-a za prijavu. Molimo pokušajte ponovo.";
      case "CredentialsSignup":
        return "Greška pri registraciji. Molimo pokušajte ponovo.";
      case "SessionRequired":
        return "Potrebna je prijava za pristup ovoj stranici.";
      default:
        return "Dogodila se neočekivana greška. Molimo pokušajte ponovo.";
    }
  };

  return (
    <div className="container mx-auto py-8 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Greška pri prijavi</CardTitle>
          <CardDescription>
            Dogodila se greška tijekom procesa prijave
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{getErrorMessage(error)}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <Button
              onClick={() => router.push("/auth/signin")}
              className="w-full"
            >
              Pokušaj ponovo
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full"
            >
              Povratak na početnu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
