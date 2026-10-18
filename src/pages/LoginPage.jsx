
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await login(email, password);

      setMessage('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Log in</h2>

      {message && (
        <p
          style={{
            color: message === 'Login successful!' ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={handleLogin}
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

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ padding: '8px', cursor: 'pointer' }}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot password?
        </button>
      </form>
    </div>
  );
}
