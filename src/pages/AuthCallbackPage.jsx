
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

export default function AuthCallbackPage() {
  const [message, setMessage] = useState('Checking your account...');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function checkAuthentication() {
      try {
        await getCurrentUser();

        if (!cancelled) {
          navigate('/', { replace: true });
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setMessage(
            'Google sign-in could not be completed. Please try again.'
          );
        }
      }
    }

    checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Google sign-in</h2>

      <p style={{ color: error ? 'red' : 'inherit' }}>
        {message}
      </p>

      {error && (
        <button onClick={() => navigate('/login', { replace: true })}>
          Back to login
        </button>
      )}
    </div>
  );
}
