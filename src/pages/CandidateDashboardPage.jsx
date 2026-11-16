
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

export default function CandidateDashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((data) => {
        if (active) {
          setUser(
            data?.user ||
            data?.data?.user ||
            data?.data ||
            data
          );
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || 'Не вдалося завантажити профіль.');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate('/login', { replace: true });
    }
  };

  if (loading) {
    return (
      <main className="candidate-dashboard">
        <p>Завантаження профілю...</p>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="candidate-dashboard">
        <p>{error || 'Не вдалося завантажити профіль.'}</p>

        <button onClick={() => navigate('/login')}>
          Увійти знову
        </button>
      </main>
    );
  }

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user.email ||
    'Кандидат';

  const initials =
    `${firstName[0] || ''}${lastName[0] || ''}` ||
    user.email?.[0]?.toUpperCase() ||
    'К';

  return (
    <main className="candidate-dashboard">
      <header className="candidate-dashboard-header">
        <button
          className="candidate-dashboard-brand"
          onClick={() => navigate('/')}
        >
          JellyJob
        </button>

        <button
          className="secondary-button"
          onClick={handleLogout}
        >
          Вийти
        </button>
      </header>

      <section className="candidate-dashboard-content">
        <p className="eyebrow">Особистий кабінет</p>

        <h1>Вітаємо, {fullName}!</h1>

        <p>
          Керуйте своїм профілем та переглядайте активність.
        </p>

        <div className="candidate-dashboard-grid">
          <article className="candidate-dashboard-card">
            <div className="large-avatar">
              {initials.toUpperCase()}
            </div>

            <h2>Мій профіль</h2>

            <p>
              <strong>Ім'я:</strong> {firstName || 'Не вказано'}
            </p>

            <p>
              <strong>Прізвище:</strong> {lastName || 'Не вказано'}
            </p>

            <p>
              <strong>Email:</strong> {user.email || 'Не вказано'}
            </p>
          </article>

          <article className="candidate-dashboard-card">
            <h2>Мої відгуки</h2>

            <p>
              Переглядайте історію відгуків на вакансії.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate('/candidate/reviews')}
            >
              Переглянути відгуки
            </button>
          </article>
        </div>
      </section>
    </main>
  );
}
