import React from "react";
import { useSession } from "@/lib/auth-client";

const ProtectedCartButton: React.FC = () => {
  const { data: session } = useSession();

  if (!session) {
    return <button disabled>Sign in to view cart</button>;
  }

  // ** rest of code here **/

  return <button>View Cart</button>;
};

export default ProtectedCartButton;
