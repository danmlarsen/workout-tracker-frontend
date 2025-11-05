"use client";

import { useAuth } from "@/api/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      if (!isLoggingOut) {
        setIsLoggingOut(true);
        await logout();
        toast.success("Successfully logged out", { id: "logout-toast" });
        router.replace("/login");
      }
    }
    handleLogout();
  }, [logout, router, isLoggingOut]);

  return null;
}
