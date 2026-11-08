
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyApplications } from '../services/applicationService';
import { getCurrentUser } from '../services/authService';

const statusNames = {
  0: 'Очікує розгляду',
  1: 'Переглянуто',
  2: 'Запрошення',
  3: 'Відхилено',
};

function getApplicationsList(response) {
  // Підтримка поширених форматів PagedResponse
  if (Array.isArray(response)) return response;

  return (
    response?.items ??
    response?.Items ??
    response?.data?.items ??
    response?.data?.Items ??
    response?.results ??
    response?.Results ??
    []
  );
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCandidate, setIsCandidate] = useState(false);

  useEffect(() => {
    async function loadApplications() {
      setLoading(true);
      setError('');

      try {
        const user = await getCurrentUser();

        if (user.role !== 0) {
          setIsCandidate(false);
          setApplications([]);
          return;
        }

        setIsCandidate(true);

        const response = await getMyApplications({
          page: 1,
          pageSize: 20,
          status,
        });

        setApplications(getApplicationsList(response));
      } catch (err) {
        setError(err.message || 'Не вдалося завантажити відгуки');
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, [status]);

  if (loading) {
    return <p>Завантаження відгуків...</p>;
  }

  if (!isCandidate && !error) {
    return (
      <main>
        <h1>Мої відгуки</h1>
        <p>Ця сторінка доступна тільки кандидатам.</p>
        <Link to="/dashboard">Повернутися</Link>
      </main>
    );
  }

  return (
    <main className="my-applications-page">
      <h1>Мої відгуки</h1>

      <div>
        <label htmlFor="application-status">
          Фільтр за статусом:
        </label>

        <select
          id="application-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Усі відгуки</option>
          <option value="0">Очікують розгляду</option>
          <option value="1">Переглянуті</option>
          <option value="2">Запрошення</option>
          <option value="3">Відхилені</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      {!error && applications.length === 0 && (
        <p>Ви ще не надсилали відгуків.</p>
      )}

      {applications.map((application) => (
        <article key={application.id} className="application-card">
          <h2>
            <Link to={`/jobs/${application.vacancyId}`}>
              {application.vacancyTitle}
            </Link>
          </h2>

          <p>
            Компанія: {application.companyName}
          </p>

          <p>
            Дата відгуку:{' '}
            {new Date(application.createdAt).toLocaleDateString('uk-UA')}
          </p>

          <p>
            Статус:{' '}
            <strong>
              {statusNames[application.status] ??
                'Невідомий статус'}
            </strong>
          </p>

          {application.coverLetter && (
            <div>
              <h3>Супровідний лист</h3>
              <p>{application.coverLetter}</p>
            </div>
          )}
        </article>
      ))}

      <p>
        <Link to="/dashboard">Повернутися до кабінету</Link>
      </p>
    </main>
  );
}
