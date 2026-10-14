import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('candidate');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {e.preventDefault();
    setMessage('');

    try {const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
    });

      if (!response.ok) {

        throw new Error('Registration failed. Email might already be in use.');
      }

      setMessage('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {

      setMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '350px' }}>
      <h2>Registration</h2>

      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <input type="email" placeholder="Email" value={email} onChange={(e) =>
             setEmail(e.target.value)} required style={{ padding: '8px' }}/>

        <input type="password" placeholder="Password" value={password} onChange={(e) =>
             setPassword(e.target.value)} required style={{ padding: '8px' }}/>
        
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ padding: '8px' }}>

          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>

        </select>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}