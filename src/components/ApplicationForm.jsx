
import { useState } from 'react';
import { createApplication } from '../services/applicationService';

export default function ApplicationForm({ vacancy }) {
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
