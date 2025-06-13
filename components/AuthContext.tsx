// ✅ Updated: components/AuthContext.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: number;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  userId: number | null;
  login: (token: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ useCallback to stabilize logout function reference
  const logout = useCallback(async () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserId(null);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        setToken(storedToken);
        setUserId(decoded.userId);

        const expMs = decoded.exp * 1000;
        if (expMs < Date.now()) {
          logout();
          router.push('/sign-up?sessionExpired=1');
        } else {
          const timeoutId = setTimeout(() => {
            logout();
            router.push('/sign-up?sessionExpired=1');
          }, expMs - Date.now());
          return () => clearTimeout(timeoutId);
        }
      } catch {
        setUserId(null);
        logout();
      }
    }
    setLoading(false);
  }, [token, router, logout]);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setUserId(decoded.userId);
    } catch {
      setUserId(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
