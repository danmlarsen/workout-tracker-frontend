"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/api/auth/auth-context";

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

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
