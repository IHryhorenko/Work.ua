import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getVacancyById } from '../data/vacancies';
import ApplicationForm from '../components/ApplicationForm';
import VacancyCard from '../components/VacancyCard';
import { getVacancies } from '../data/vacancies';

export default function VacancyPage() {
  const { id } = useParams();

  const vacancy = getVacancyById(id);
  const [saved, setSaved] = useState(() => {
    const savedVacancies = JSON.parse(
      localStorage.getItem('savedVacancies') || '[]'
    );

    return savedVacancies.includes(id);
  });

  if (!vacancy) {
    return (
      <main className="page">
        <h1>Вакансію не знайдено</h1>
        <Link to="/jobs">Повернутися до вакансій</Link>
      </main>
    );
  }

  function toggleSaved() {
    const savedVacancies = JSON.parse(
      localStorage.getItem('savedVacancies') || '[]'
    );

    let updated;

    if (savedVacancies.includes(id)) {
      updated = savedVacancies.filter((savedId) => savedId !== id);
    } else {
      updated = [...savedVacancies, id];
    }

    localStorage.setItem('savedVacancies', JSON.stringify(updated));
    setSaved(!saved);
  }

  const similarVacancies = getVacancies().filter(
    (item) =>
      item.id !== vacancy.id &&
      item.category === vacancy.category
  );

  return (
    <main className="page">
      <Link to="/jobs">Назад до вакансій</Link>

      <h1>{vacancy.title}</h1>

      <h2>{vacancy.company}</h2>

      <p>Місто: {vacancy.city}</p>
      <p>Зарплата: {vacancy.salary}</p>
      <p>Тип зайнятості: {vacancy.employment}</p>
      <p>Формат роботи: {vacancy.workFormat}</p>
      <p>Досвід: {vacancy.experience}</p>

      <button type="button" onClick={toggleSaved}>
        {saved ? 'Видалити зі збережених' : 'Зберегти вакансію'}
      </button>

      <section>
        <h2>Опис вакансії</h2>
        <p>{vacancy.description}</p>
      </section>

      <section>
        <h2>Обов'язки</h2>
        <p>{vacancy.responsibilities}</p>
      </section>

      <section>
        <h2>Вимоги</h2>
        <p>{vacancy.requirements}</p>
      </section>

      <section>
        <h2>Умови роботи</h2>
        <p>{vacancy.conditions}</p>
      </section>

      <ApplicationForm vacancy={vacancy} />

      <section>
        <h2>Схожі вакансії</h2>

        {similarVacancies.length > 0 ? (
          similarVacancies.map((item) => (
            <VacancyCard key={item.id} vacancy={item} />
          ))
        ) : (
          <p>Схожих вакансій немає</p>
        )}
      </section>
    </main>
  );
}