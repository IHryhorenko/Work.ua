import { useState } from 'react';

export default function ApplicationForm({ vacancy }) {
  const [resume, setResume] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const applications = JSON.parse(
      localStorage.getItem('applications') || '[]'
    );

    const application = {
      id: Date.now().toString(),
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      company: vacancy.company,
      coverLetter,
      status: 'Новий',
      date: new Date().toISOString(),
    };

    applications.push(application);

    localStorage.setItem(
      'applications',
      JSON.stringify(applications)
    );

    setMessage('Відгук успішно надіслано');
    setCoverLetter('');
  }

  return (
    <section>
      <h2>Відгукнутися на вакансію</h2>

      <p>
        Вакансія: <strong>{vacancy.title}</strong>
      </p>

      <p>
        Компанія: <strong>{vacancy.company}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Відгук:
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Напишіть відгук..."
            rows="5"
            required
          />
        </label>

        <button type="submit">
          Надіслати відгук
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
}