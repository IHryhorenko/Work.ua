
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useNotification } from '../components/NotificationProvider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { notify } = useNotification();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);

      notify('Login successful!', 'success');
      navigate('/');
    } catch (err) {
      notify(err.message || 'Login failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Log in</h2>

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
