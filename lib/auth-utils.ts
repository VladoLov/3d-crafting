import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import getServerSession from "next-auth";
import authConfig from "@/auth.config";

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/signin");
  }
  return user;
}
export async function requireServerAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
/* export async function requireAuth() {
  const session = await getServerSession(authConfig);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
} */

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "admin") {
    redirect("/");
  }
  return user;
}

export async function getUserWithDetails(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    include: {
      orders: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      designs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export async function getUserOrders(userId: string) {
  return await db.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
