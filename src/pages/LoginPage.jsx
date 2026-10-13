import { useState } from 'react';
import './App.css';

function App() {
  const [authType, setAuthType] = useState('login');
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');


  const handleLoginSubmit = (e) => { e.preventDefault();

    console.log('Login data:', { email: loginEmail, password: loginPassword }); 
    alert(`Login attempt with email: ${loginEmail}`); 

};

  const handleRegisterSubmit = (e) => { e.preventDefault();

    console.log('Registration data:', { name: regName, email: regEmail, password: regPassword });
    alert(`Registration successful for user: ${regName}`);

  };

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
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>

            <h3>Log in</h3>
            <input type="email" placeholder="Email" value={loginEmail}onChange={(e) => 
                setLoginEmail(e.target.value)}style={{ padding: '8px' }} />

            <input type="password" placeholder="Password" value={loginPassword}onChange={(e) => 
                setLoginPassword(e.target.value)}style={{ padding: '8px' }} />
            
            <button type="submit" style={{ padding: '10px', background: '#007bff', 
                color: '#fff', border: 'none', cursor: 'pointer' 
                }}>Log in</button>

          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '280px' }}>
            <h3>Registration</h3>
            <input type="text" placeholder="Name" value={regName}onChange={(e) => 
                setRegName(e.target.value)}style={{ padding: '8px' }} />

            <input type="email" placeholder="Email" value={regEmail}onChange={(e) => 
                setRegEmail(e.target.value)}style={{ padding: '8px' }} />

            <input type="password" placeholder="Password" value={regPassword}onChange={(e) => 
                setRegPassword(e.target.value)}style={{ padding: '8px' }} />

            <button type="submit" style={{ padding: '10px', background: '#28a745', 
                color: '#fff', border: 'none', cursor: 'pointer' }}>Register</button>

          </form>
        )}
      </div>
    </div>
  );
}

export default App;