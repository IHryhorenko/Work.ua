
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSubmitted(true);
      setMessage(
        'If an account with this email exists, you will receive instructions.'
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Forgot password?</h2>
      <p>Enter your email to request a password reset.</p>

      {message && <p>{message}</p>}

      {!submitted && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px' }}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset instructions'}
          </button>
        </form>
      )}

      <button
        type="button"
        onClick={() => navigate('/login')}
        style={{ marginTop: '12px' }}
      >
        Back to login
      </button>
    </div>
  );
}
