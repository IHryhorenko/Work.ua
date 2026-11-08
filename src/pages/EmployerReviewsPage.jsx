import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployerReviewsPage() {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState([]);

  const filteredReviews = useMemo(() => {
    if (filter === 'all') return reviews;

    return reviews.filter(
      (review) => review.statusType === filter
    );
  }, [filter, reviews]);

  const markAsViewed = (id) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === id
          ? {
              ...review,
              status: 'Переглянуто',
              statusType: 'viewed',
            }
          : review
      )
    );
  };

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
              Кабінет роботодавця
            </div>

            <h1>Відгуки кандидатів</h1>

            <p>
              Перегляд відгуків на вакансії та робота із заявками кандидатів.
            </p>
          </div>

          <div className="reviews-count">
            {filteredReviews.length}
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
            className={filter === 'new' ? 'active' : ''}
            onClick={() => setFilter('new')}
          >
            Нові
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
            Відмовлено
          </button>
        </div>

        <section className="reviews-list">
          {filteredReviews.map((review) => (
            <article
              className="review-card"
              key={review.id}
            >
              <div className="review-main">
                <div className="avatar">
                  {review.candidate
                    ?.split(' ')
                    .map((name) => name[0])
                    .join('')}
                </div>

                <div>
                  <h2>{review.candidate}</h2>

                  <p className="review-position">
                    {review.position}
                  </p>

                  <p className="review-date">
                    Відгук від {review.date}
                  </p>
                </div>
              </div>

              <div className="review-actions">
                <span className={`status status-${review.statusType}`}>
                  {review.status}
                </span>

                {review.statusType === 'new' && (
                  <button
                    className="secondary-button"
                    onClick={() => markAsViewed(review.id)}
                  >
                    Переглянути
                  </button>
                )}

                <button
                  className="primary-button"
                  onClick={() => navigate('/candidate/reviews')}
                >
                  Історія кандидата
                </button>
              </div>
            </article>
          ))}

          {filteredReviews.length === 0 && (
            <div className="empty-state">
              За цим фільтром відгуків немає.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}