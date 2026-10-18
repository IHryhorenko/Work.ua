
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

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
      await register(email, password, role);

      setSuccess(true);
      setMessage(
        'Registration successful! Check your email if verification is required.'
      );
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Create account</h2>

      {message && (
        <p style={{ color: success ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      {!success && (
        <form
          onSubmit={handleRegister}
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
            autoComplete="email"
            required
            style={{ padding: '8px' }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            style={{ padding: '8px' }}
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            style={{ padding: '8px' }}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      )}

      {success && (
        <button onClick={() => navigate('/login')}>
          Go to login
        </button>
      )}

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
