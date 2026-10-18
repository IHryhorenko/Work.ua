
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/authService';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!token) {
      setMessage('Invalid or missing reset link.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    if (password.length < 8) {
      setMessage('Password must contain at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      await resetPassword(token, password);
      setSuccess(true);
      setMessage('Password changed successfully.');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Reset password</h2>
      <p>Enter your new password below.</p>

      {message && (
        <p style={{ color: success ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {!success && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            autoComplete="new-password"
            required
            style={{ padding: '8px' }}
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            autoComplete="new-password"
            required
            style={{ padding: '8px' }}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Change password'}
          </button>
        </form>
      )}

      {success && (
        <button onClick={() => navigate('/login')}>
          Back to login
        </button>
      )}

      {!success && (
        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
          style={{ marginTop: '10px' }}
        >
          Request a new reset link
        </button>
      )}
    </div>
  );
}
