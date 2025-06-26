"use client"
import React from 'react'
import { Button } from '../button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { logOutAction } from '@/action/users'

function LogOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    const errorMessage = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out successfully");
      router.push("/");
    } else {
      toast.error(errorMessage.errorMessage);
    }

    setLoading(false);
  };

  return (
    <Button
      className="w-24"
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Logout"}
    </Button>
  );
}

export default LogOutButton