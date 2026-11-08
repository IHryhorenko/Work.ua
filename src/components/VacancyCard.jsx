import { Link } from 'react-router-dom';

export default function VacancyCard({ vacancy }) {
  return (
    <article className="vacancy-card">
      <h3>
        <Link to={`/jobs/${vacancy.id}`}>
          {vacancy.title}
        </Link>
      </h3>

      <p>
        <strong>{vacancy.companyName}</strong>
      </p>

      <p>{vacancy.city}</p>

      {vacancy.description && (
        <p>{vacancy.description}</p>
      )}

      <Link to={`/jobs/${vacancy.id}`}>
        Переглянути вакансію
      </Link>
    </article>
  );
}