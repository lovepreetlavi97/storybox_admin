import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken, removeAuthToken, setAuthToken } from '@/utils/auth';

export function useAuth() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setAuthorized(false);
      setLoading(false);
    } else {
      setAuthorized(true);
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    setAuthToken(token);
    setAuthorized(true);
    router.push('/dashboard');
  };

  const logout = () => {
    removeAuthToken();
    setAuthorized(false);
    router.push('/login');
  };

  return {
    authorized,
    loading,
    login,
    logout,
  };
}
