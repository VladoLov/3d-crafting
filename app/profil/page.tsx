import {
  requireAuth,
  getUserWithDetails,
  requireServerAuth,
} from "@/lib/auth-utils";
import { UserProfile } from "@/components/user/user-profile";
import { UserOrders } from "@/components/user/user-orders";
import { UserDesigns } from "@/components/user/user-designs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { use } from "react";

export default async function ProfilPage() {
  const user = await requireServerAuth();
  const userWithDetails = await getUserWithDetails(user.id);

  if (!userWithDetails) {
    return <div>Korisnik nije pronađen</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {/* Moj profil {userWithDetails.name} */}
      </h1>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Moj profil</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="orders">
              Narudžbe ({userWithDetails.orders.length})
            </TabsTrigger>
            <TabsTrigger value="designs">
              Dizajni ({userWithDetails.designs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <UserProfile user={userWithDetails} />
          </TabsContent>

          {/*     <TabsContent value="orders" className="mt-6">
            <UserOrders orders={userWithDetails.orders} />
          </TabsContent> */}

          <TabsContent value="designs" className="mt-6">
            <UserDesigns designs={userWithDetails.designs} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
