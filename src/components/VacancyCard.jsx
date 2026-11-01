import { Link } from 'react-router-dom';

export default function VacancyCard({ vacancy }) {
  return (
    <article className="vacancy-card">
      <h3>
        <Link to={`/jobs/${vacancy.id}`}>
          {vacancy.title}
        </Link>
      </h3>

      <p><strong>{vacancy.company}</strong></p>
      <p>{vacancy.city}</p>
      <p>{vacancy.salary}</p>

      <div>
        <span>{vacancy.employment}</span>
        {' · '}
        <span>{vacancy.workFormat}</span>
      </div>

      <p>{vacancy.experience}</p>

      <Link to={`/jobs/${vacancy.id}`}>
        Переглянути вакансію
      </Link>
    </article>
  );
}