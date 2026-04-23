'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useLogOut = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/auth/logout/', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error: any) {
      toast.error('Logout Error', error);
    } finally {
      setIsLoading(false);
      router.push('/login');
    }
  };
  return { logout, isLoading };
};
