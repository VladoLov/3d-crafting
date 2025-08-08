"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { AuthModal } from "./auth-modal";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({
  children,
  fallback,
  requireAuth = true,
}: AuthGuardProps) {
  const { data: session, isPending } = useSession();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!isPending && requireAuth && !session) {
      setShowAuthModal(true);
    }
  }, [session, isPending, requireAuth]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (requireAuth && !session) {
    return (
      <>
        {fallback || (
          <div className="text-center p-8">
            <p className="text-gray-600">
              Morate se prijaviti da biste pristupili ovoj stranici.
            </p>
          </div>
        )}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  return <>{children}</>;
}
