"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession, signIn, signUp, signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export default function TestAuthPage() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    try {
      const result = await signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Registracija uspješna!");
      }
    } catch (error) {
      toast.error("Greška pri registraciji");
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success("Prijava uspješna!");
      }
    } catch (error) {
      toast.error("Greška pri prijavi");
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Odjava uspješna!");
          },
        },
      });
    } catch (error) {
      toast.error("Greška pri odjavi");
      console.error(error);
    }
  };

  if (isPending) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Test Authentication</h1>

      {session ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h2 className="font-semibold">Prijavljeni ste kao:</h2>
            <p>Ime: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <p>ID: {session.user.id}</p>
          </div>
          <Button onClick={handleSignOut} variant="destructive">
            Odjavi se
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            placeholder="Ime"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button onClick={handleSignUp}>Registriraj se</Button>
            <Button onClick={handleSignIn} variant="outline">
              Prijavi se
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
