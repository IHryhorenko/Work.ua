import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import GoogleLoginButton from '../components/GoogleLoginButton';
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout className="auth-login">
      <main className="auth-split">
        <section className="auth-panel auth-form-panel">
          <div className="auth-form-wrap">
            <h1>Вхід у акаунт</h1>
            <p className="auth-subtitle">Увійдіть, щоб продовжити</p>

            <div className="social-buttons">
              <button type="button" className="social-button" aria-label="Facebook" title="Facebook">f</button>
              <GoogleLoginButton />
            </div>

            {message && <p className="form-message" role="alert">{message}</p>}

            <form className="auth-form" onSubmit={handleLogin}>
              <label className="visually-hidden" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <label className="visually-hidden" htmlFor="login-password">Пароль</label>
              <input
                id="login-password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />

              <div className="form-options">
                <label className="remember-option">
                  <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                  <span>Запам’ятати мене</span>
                </label>
                <Link to="/forgot-password">Забули пароль?</Link>
              </div>

              <button className="pill-button primary-pill" type="submit" disabled={loading}>
                {loading ? 'Зачекайте…' : 'Увійти'}
              </button>
            </form>
          </div>
        </section>

        <section className="auth-panel auth-promo-panel">
          <div className="promo-content">
            <h2>Ще не з нами?</h2>
            <p>
              Тоді саме час це виправити!<br />
              Створюй акаунт у JellyJob, відкривай цікаві<br className="desktop-break" />
              вакансії та знаходь можливості, які приведуть<br className="desktop-break" />
              тебе до роботи мрії.
            </p>
            <button className="pill-button outline-pill" type="button" onClick={() => navigate('/choose-role')}>
              Зареєструватися
            </button>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}
