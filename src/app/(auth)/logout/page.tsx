"use client";

import { useAuth } from "@/api/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    async function handleLogout() {
      await logout();
      toast.success("Successfully logged out");
      router.push("/login");
    }
    handleLogout();
  }, [logout, router]);

  return null;
}
