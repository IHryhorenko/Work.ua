import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CandidateReviewsPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('all');
  const [history, setHistory] = useState([]);

  const filteredHistory = useMemo(() => {
    if (filter === 'all') return history;

    return history.filter(
      (item) => item.statusType === filter
    );
  }, [filter, history]);

  return (
    <div className="reviews-page">
      <header className="reviews-header">
        <button
          className="brand"
          onClick={() => navigate('/')}
        >
          work.ua
        </button>

        <div className="profile-name">
          Kedryk Kostia
        </div>
      </header>

      <main className="reviews-container">
        <button
          className="back-link"
          onClick={() => navigate('/')}
        >
          ← Назад
        </button>

        <div className="page-title-row">
          <div>
            <div className="eyebrow">
              Кабінет кандидата
            </div>

            <h1>Історія відгуків</h1>

            <p>
              Усі вакансії, на які кандидат надсилав свої відгуки.
            </p>
          </div>

          <div className="reviews-count">
            {filteredHistory.length}
          </div>
        </div>

        <div className="candidate-summary">
          <div className="large-avatar">
            KK
          </div>

          <div>
            <strong>Kedryk Kostia</strong>
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

        <section className="reviews-list">
          {filteredHistory.map((item) => (
            <article
              className="history-card"
              key={item.id}
            >
              <div>
                <div className="history-topline">
                  <span className={`status status-${item.statusType}`}>
                    {item.status}
                  </span>

                  <span className="review-date">
                    {item.date}
                  </span>
                </div>

                <h2>{item.position}</h2>

                <p>{item.company}</p>
              </div>

              <button
                className="details-button"
                onClick={() => navigate('/employer/reviews')}
              >
                Детальніше
              </button>
            </article>
          ))}

          {filteredHistory.length === 0 && (
            <div className="empty-state">
              За цим фільтром історії немає.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}