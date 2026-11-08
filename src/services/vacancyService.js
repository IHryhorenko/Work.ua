
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createApplication } from '../services/applicationService';
import { getCurrentUser } from '../services/authService';

export default function ApplicationForm({ vacancy }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setCheckingUser(false);
      }
    }

    loadUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    try {
      await createApplication({
        vacancyId: vacancy.id,
        coverLetter: coverLetter.trim(),
      });

      setMessage('Відгук успішно надіслано');
      setCoverLetter('');
    } catch (err) {
      setError(err.message || 'Не вдалося надіслати відгук');
    } finally {
      setLoading(false);
    }
  }

  if (checkingUser) {
    return <p>Перевірка користувача...</p>;
  }

  if (!user) {
    return (
      <section>
        <p>Щоб відгукнутися на вакансію, потрібно увійти в акаунт</p>
        <Link to="/login">Увійти</Link>
      </section>
    );
  }

  if (user.role !== 0) {
    return null;
  }

  return (
    <section>
      <h2>Відгукнутися на вакансію</h2>

      <p>
        Вакансія: <strong>{vacancy.title}</strong>
      </p>

      <p>
        Компанія: <strong>{vacancy.companyName}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Супровідний лист:
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Розкажіть, чому вас зацікавила ця вакансія..."
            rows="5"
            maxLength={2000}
          />
        </label>

        {error && <p className="error-message">{error}</p>}
        {message && <p>{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Надсилання...' : 'Надіслати відгук'}
        </button>
      </form>
    </section>
  );
}
