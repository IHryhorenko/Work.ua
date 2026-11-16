
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const API_URL = '/api';

async function getMyApplications() {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${API_URL}/Application/my`, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!response.ok) {
    throw new Error('Не вдалося завантажити історію відгуків.');
  }

  return response.json();
}

function getStatusInfo(status) {
  const value = String(status ?? '').toLowerCase();

  if (['pending', 'sent', 'submitted'].includes(value)) {
    return { label: 'Надіслано', type: 'sent', filter: 'sent' };
  }

  if (['viewed', 'reviewed'].includes(value)) {
    return { label: 'Переглянуто', type: 'viewed', filter: 'viewed' };
  }

  if (['rejected', 'declined'].includes(value)) {
    return { label: 'Відмовлено', type: 'rejected', filter: 'rejected' };
  }

  return {
    label: String(status ?? 'Невідомо'),
    type: 'sent',
    filter: 'other',
  };
}

function formatDate(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleDateString('uk-UA');
}

export default function CandidateReviewsPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('all');
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [userData, applicationsData] = await Promise.all([
          getCurrentUser(),
          getMyApplications(),
        ]);

        if (!active) return;

        const currentUser =
          userData?.user ||
          userData?.data?.user ||
          userData?.data ||
          userData;

        const applications =
          applicationsData?.items ||
          applicationsData?.data?.items ||
          (Array.isArray(applicationsData) ? applicationsData : []);

        setUser(currentUser);
        setHistory(applications);
      } catch (err) {
        if (active) {
          setError(err.message || 'Помилка завантаження.');
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const filteredHistory = useMemo(() => {
    if (filter === 'all') return history;

    return history.filter(
      (item) => getStatusInfo(item.status).filter === filter
    );
  }, [filter, history]);

  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    user?.email ||
    'Кандидат';

  const initials =
    `${firstName[0] || ''}${lastName[0] || ''}` ||
    user?.email?.[0]?.toUpperCase() ||
    '?';

  if (loading) {
    return (
      <div className="reviews-page">
        <main className="reviews-container">
          <p>Завантаження історії відгуків...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <header className="reviews-header">
        <button className="brand" onClick={() => navigate('/')}>
          JellyJob
        </button>

        <div className="profile-name">{fullName}</div>
      </header>

      <main className="reviews-container">
        <button
          className="back-link"
          onClick={() => navigate('/dashboard')}
        >
          ← Назад
        </button>

        <div className="page-title-row">
          <div>
            <div className="eyebrow">Кабінет кандидата</div>

            <h1>Історія відгуків</h1>

            <p>
              Усі вакансії, на які ти надсилав відгуки.
            </p>
          </div>

          <div className="reviews-count">
            {filteredHistory.length}
          </div>
        </div>

        <div className="candidate-summary">
          <div className="large-avatar">
            {initials.toUpperCase()}
          </div>

          <div>
            <strong>{fullName}</strong>
            <span>Історія відгуків кандидата</span>
          </div>
        </div>

        <div className="filter-tabs">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Усі
          </button>

          <button
            className={filter === 'sent' ? 'active' : ''}
            onClick={() => setFilter('sent')}
          >
            Надіслані
          </button>

          <button
            className={filter === 'viewed' ? 'active' : ''}
            onClick={() => setFilter('viewed')}
          >
            Переглянуті
          </button>

          <button
            className={filter === 'rejected' ? 'active' : ''}
            onClick={() => setFilter('rejected')}
          >
            Відмови
          </button>
        </div>

        {error && (
          <div className="empty-state">
            {error}
          </div>
        )}

        {!error && (
          <section className="reviews-list">
            {filteredHistory.map((item) => {
              const status = getStatusInfo(item.status);

              return (
                <article className="history-card" key={item.id}>
                  <div>
                    <div className="history-topline">
                      <span className={`status status-${status.type}`}>
                        {status.label}
                      </span>

                      <span className="review-date">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    <h2>{item.vacancyTitle || 'Вакансія'}</h2>

                    <p>{item.companyName || 'Компанія'}</p>
                  </div>

                  {item.coverLetter && (
                    <p>{item.coverLetter}</p>
                  )}
                </article>
              );
            })}

            {filteredHistory.length === 0 && (
              <div className="empty-state">
                За цим фільтром історії немає.
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
