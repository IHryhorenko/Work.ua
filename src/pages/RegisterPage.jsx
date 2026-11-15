import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import GoogleLoginButton from '../components/GoogleLoginButton';
import AuthLayout from '../components/AuthLayout';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const role = sessionStorage.getItem('registrationRole') || 'candidate';

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage('');

    if (password.length < 8) {
      setMessage('Пароль повинен містити щонайменше 8 символів.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, role, username);
      setSuccess(true);
      setMessage('Реєстрацію успішно виконано! Перевірте електронну пошту.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout className="auth-register">
      <main className="auth-split reverse">
        <section className="auth-panel auth-promo-panel">
          <div className="promo-content">
            <h2>Давно не бачились!</h2>
            <p>
              Скучили?<br />
              Заходь у свій акаунт, повертайся до пошуку<br className="desktop-break" />
              цікавих вакансій та не пропускай нові<br className="desktop-break" />
              можливості!
            </p>
            <button className="pill-button outline-pill" type="button" onClick={() => navigate('/login')}>
              Увійти
            </button>
          </div>
        </section>

        <section className="auth-panel auth-form-panel">
          <div className="auth-form-wrap register-wrap">
            <h1>Реєстрація</h1>
            <p className="auth-subtitle">Приєднуйся до JellyJob!</p>

            <div className="social-buttons">
              <button type="button" className="social-button" aria-label="Facebook" title="Facebook">f</button>
              <GoogleLoginButton />
            </div>

            {message && <p className={`form-message ${success ? 'success' : ''}`} role="status">{message}</p>}

            {!success ? (
              <form className="auth-form register-form" onSubmit={handleRegister}>
                <label className="visually-hidden" htmlFor="register-username">Логін</label>
                <input
                  id="register-username"
                  type="text"
                  placeholder="Login"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />

                <label className="visually-hidden" htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />

                <label className="visually-hidden" htmlFor="register-password">Пароль</label>
                <input
                  id="register-password"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />

                <button className="pill-button primary-pill" type="submit" disabled={loading}>
                  {loading ? 'Зачекайте…' : 'Зареєструватися'}
                </button>
              </form>
            ) : (
              <button className="pill-button primary-pill" type="button" onClick={() => navigate('/login')}>
                Перейти до входу
              </button>
            )}

            <p className="auth-switch">Вже маєте акаунт? <Link to="/login">Увійти</Link></p>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}
