"use client";

import { use, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { update } = useSession();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      toast.error("Greška pri prijavi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSignIn = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Neispravni podaci za prijavu");
      } else {
        await update();
        toast.success("Uspješno ste se prijavili");
        onClose();
        router.refresh();
      }
    } catch (error) {
      toast.error("Greška pri prijavi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        toast.success("Uspješno ste se registrirali");
        // Auto sign in after registration
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        onClose();
        router.refresh();
      } else {
        const data = await response.json();
        toast.error(data.error || "Greška pri registraciji");
      }
    } catch (error) {
      toast.error("Greška pri registraciji");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dobrodošli</DialogTitle>
          <DialogDescription>
            Prijavite se ili se registrirajte za nastavak
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Prijava</TabsTrigger>
            <TabsTrigger value="signup">Registracija</TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="space-y-4">
            <form action={handleCredentialsSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Lozinka</Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Prijavljivanje..." : "Prijavite se"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ili
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-transparent"
            >
              Prijavite se s Google
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form action={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Ime</Label>
                <Input
                  id="signup-name"
                  name="name"
                  type="text"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Lozinka</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registriranje..." : "Registrirajte se"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ili
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-transparent"
            >
              Registrirajte se s Google
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
