import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {e.preventDefault();
    setMessage('');

    try {

      const response = await fetch('http://localhost:5000/api/auth/login', {method: 'POST',
        headers: { 'Content-Type': 'application/json' },body: JSON.stringify({ email, password }),

      });

      if (!response.ok) {

        throw new Error('Login failed. Check your credentials.');
      
      }

      setMessage('Login successful!');
      setTimeout(() => navigate('/'), 1000);

    } catch (err) {

      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Log in</h2>
      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        <input type="email" placeholder="Email" value={email} onChange={(e) =>
         setEmail(e.target.value)} required style={{ padding: '8px' }}/>

        <input type="password" placeholder="Password" value={password} onChange={(e) =>
         setPassword(e.target.value)} required style={{ padding: '8px' }}/>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Log in</button>

      </form>
    </div>
  );
}