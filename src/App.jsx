import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>

        <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          
          <Link to="/">Home</Link>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </nav>

        <Routes>
          <Route path="/" element={<h2>Home Page (Teammate's section)</h2>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}