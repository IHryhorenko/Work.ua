
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import GoogleLoginButton from '../components/GoogleLoginButton';
import AuthLayout from '../components/AuthLayout';

export default function RegisterPage() {
  const navigate = useNavigate();
  const role = sessionStorage.getItem('registrationRole') || 'candidate';

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyWebsite: '',
    companyDescription: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isEmployer = role === 'employer';

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage('');

    if (form.firstName.trim().length < 2) {
      setMessage("Ім'я повинно містити щонайменше 2 символи.");
      return;
    }

    if (form.lastName.trim().length < 2) {
      setMessage('Прізвище повинно містити щонайменше 2 символи.');
      return;
    }

    if (form.password.length < 8) {
      setMessage('Пароль повинен містити щонайменше 8 символів.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage('Паролі не збігаються.');
      return;
    }

    setLoading(true);

    try {
      if (isEmployer && !form.companyName.trim()) {
        setMessage('Вкажіть назву компанії.');
        return;
      }

      await register(
        form.email,
        form.password,
        role,
        form.firstName,
        form.lastName,
        form.companyName,
        form.companyWebsite,
        form.companyDescription
      );

      setSuccess(true);
      setMessage('Реєстрацію успішно виконано! Тепер можна увійти.');
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
            <h2>Вже маєте акаунт?</h2>
            <p>
              Поверніться до JellyJob та продовжуйте
              <br className="desktop-break" />
              користуватися всіма можливостями платформи.
            </p>
            <button
              className="pill-button outline-pill"
              type="button"
              onClick={() => navigate('/login')}
            >
              Увійти
            </button>
          </div>
        </section>

        <section className="auth-panel auth-form-panel">
          <div className="auth-form-wrap register-wrap">
            <h1>{isEmployer ? 'Реєстрація роботодавця' : 'Реєстрація'}</h1>

            <p className="auth-subtitle">
              {isEmployer
                ? 'Створіть обліковий запис роботодавця'
                : 'Приєднуйся до JellyJob!'}
            </p>

            <div className="social-buttons">
              <button
                type="button"
                className="social-button"
                aria-label="Facebook"
                title="Facebook"
              >
                f
              </button>
              <GoogleLoginButton />
            </div>

            {message && (
              <p
                className={`form-message ${success ? 'success' : ''}`}
                role="status"
              >
                {message}
              </p>
            )}

            {!success ? (
              <form
                className="auth-form register-form"
                onSubmit={handleRegister}
              >
                <input
                  name="firstName"
                  type="text"
                  placeholder="Ім'я"
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  minLength={2}
                />

                <input
                  name="lastName"
                  type="text"
                  placeholder="Прізвище"
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  minLength={2}
                />

                <input
                  name="email"
                  type="email"
                  placeholder={isEmployer ? 'Робочий Email' : 'Email'}
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                {isEmployer && (
                  <>
                    <input
                      name="companyName"
                      type="text"
                      placeholder="Назва компанії"
                      value={form.companyName}
                      onChange={handleChange}
                      required
                    />

                    <input
                      name="companyWebsite"
                      type="url"
                      placeholder="Вебсайт компанії (необов'язково)"
                      value={form.companyWebsite}
                      onChange={handleChange}
                    />

                    <textarea
                      name="companyDescription"
                      placeholder="Опис компанії (необов'язково)"
                      value={form.companyDescription}
                      onChange={handleChange}
                      rows={3}
                    />
                  </>
                )}

                <input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  autoComplete="new-password"
                  minLength={8}
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Підтвердіть пароль"
                  autoComplete="new-password"
                  minLength={8}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  className="pill-button primary-pill"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Зачекайте…' : 'Зареєструватися'}
                </button>
              </form>
            ) : (
              <button
                className="pill-button primary-pill"
                type="button"
                onClick={() => navigate('/login')}
              >
                Перейти до входу
              </button>
            )}

            <p className="auth-switch">
              Вже маєте акаунт? <Link to="/login">Увійти</Link>
            </p>
          </div>
        </section>
      </main>
    </AuthLayout>
  );
}
