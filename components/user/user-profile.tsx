"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string | null;
    banned: boolean;
    banReason: string | null;
    banExpires: Date | null;
    createdAt: Date;
    orders: any[];
    designs: any[];
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const [name, setName] = useState(user.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  /* console.log(user); */
  const handleUpdateProfile = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const newName = formData.get("name") as string;

      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        setName(newName); // 🔹 osvježi lokalno
        toast.success("Profil je uspješno ažuriran");
        setIsEditing(false);
        router.refresh(); // 🔹 osvježi stranicu
      } else {
        toast.error("Greška pri ažuriranju profila");
      }
    } catch (error) {
      toast.error("Greška pri ažuriranju profila");
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleUpdateProfile(formData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Osnovne informacije
          </CardTitle>
          <CardDescription>Vaše osnovne informacije o profilu</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback className="text-lg">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge
                  variant={user.role === "admin" ? "default" : "secondary"}
                >
                  {user.role === "admin" ? "Administrator" : "Korisnik"}
                </Badge>
                {user.banned && (
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-1"
                  >
                    <AlertTriangle className="h-3 w-3" />
                    Suspendiran
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Član od {new Date(user.createdAt).toLocaleDateString("hr-HR")}
              </div>
            </div>
          </div>

          {user.banned && user.banReason && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm font-medium text-destructive">
                Razlog suspenzije:
              </p>
              <p className="text-sm text-destructive/80">{user.banReason}</p>
              {user.banExpires && (
                <p className="text-sm text-destructive/80">
                  Suspenzija ističe:{" "}
                  {new Date(user.banExpires).toLocaleDateString("hr-HR")}
                </p>
              )}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-4">
              <p>{user.name}</p>
              <Button onClick={() => setIsEditing(true)}>Uredi profil</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Label htmlFor="name">Ime</Label>
              <Input
                id="name"
                name="name"
                defaultValue={user.name || ""}
                disabled={isLoading}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Spremanje..." : "Spremi"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                >
                  Odustani
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Ukupno narudžbi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Ukupno dizajna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.designs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status računa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.banned ? (
                <span className="text-destructive">Suspendiran</span>
              ) : (
                <span className="text-green-600">Aktivan</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
