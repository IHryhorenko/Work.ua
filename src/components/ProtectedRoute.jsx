
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

export default function ProtectedRoute() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    async function checkUser() {
      try {
        await getCurrentUser();

        if (!cancelled) {
          setStatus('authenticated');
        }
      } catch {
        if (!cancelled) {
          setStatus('unauthenticated');
        }
      }
    }

    checkUser();

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return <p>Checking authentication...</p>;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
