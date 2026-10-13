import { useState } from 'react';
import './App.css';

function App() {
  const [authType, setAuthType] = useState('login');

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Work.ua/china</h1>
      
      <div style={{ margin: '20px 0' }}>
        
        <button onClick={() => setAuthType('login')} style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}>
          Log in
        </button>

        <button onClick={() => setAuthType('register')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Registration
        </button>

      </div>

      <div style={{ display: 'inline-block', padding: '20px', 
        border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}>

        {authType === 'login' ? (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>

            <h3>Log in</h3>

            <input type="email" placeholder="Email" style={{ padding: '8px' }} />
            <input type="password" placeholder="Password" style={{ padding: '8px' }} />

            <button type="submit" style={{ padding: '10px', background: '#007bff', 
              color: '#fff', border: 'none', cursor: 'pointer' }}>Log in</button>
         
          </form>

        ) : (
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>

            <h3>Registration</h3>

            <input type="text" placeholder="Name" style={{ padding: '8px' }} />
            <input type="email" placeholder="Email" style={{ padding: '8px' }} />
            <input type="password" placeholder="Password" style={{ padding: '8px' }} />

            <button type="submit" style={{ padding: '10px', background: '#28a745', 
              color: '#fff', border: 'none', cursor: 'pointer' }}>Register</button>
          
          </form>
        )}
      </div>
    </div>
  );
}

export default App;