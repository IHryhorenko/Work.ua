
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../services/authService';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      if (!token) {
        setStatus('error');
        setMessage('Verification link is invalid or incomplete.');
        return;
      }

      try {
        await verifyEmail(token);

        if (!cancelled) {
          setStatus('success');
          setMessage('Your email has been verified successfully.');
        }
      } catch (err) {
        if (!cancelled) {
          setStatus('error');
          setMessage(err.message);
        }
      }
    }

    verify();

    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>Verify email</h2>

      <p
        style={{
          color:
            status === 'success'
              ? 'green'
              : status === 'error'
                ? 'red'
                : 'inherit',
        }}
      >
        {message}
      </p>

      {status === 'success' && (
        <button onClick={() => navigate('/login')}>
          Continue to login
        </button>
      )}

      {status === 'error' && (
        <button onClick={() => navigate('/login')}>
          Back to login
        </button>
      )}
    </div>
  );
}
