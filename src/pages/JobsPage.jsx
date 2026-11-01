import { useState } from 'react';
import { Link } from 'react-router-dom';
import VacancyCard from '../components/VacancyCard';
import { getVacancies } from '../data/vacancies';

export default function JobsPage() {
  const [vacancies] = useState(getVacancies);

  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('Усі');
  const [workFormat, setWorkFormat] = useState('Усі');

  const filteredVacancies = vacancies.filter((vacancy) => {
    const searchMatch =
      vacancy.title.toLowerCase().includes(search.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(search.toLowerCase());

    const cityMatch = vacancy.city
      .toLowerCase()
      .includes(city.toLowerCase());

    const categoryMatch =
      category === 'Усі' || vacancy.category === category;

    const formatMatch =
      workFormat === 'Усі' || vacancy.workFormat === workFormat;

    return searchMatch && cityMatch && categoryMatch && formatMatch;
  });

  return (
    <main className="page">
      <h1>Пошук вакансій</h1>

      <p>
        <Link to="/">На головну</Link>
      </p>

      <div className="filters">
        <input
          type="text"
          placeholder="Посада або компанія"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Місто"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Усі</option>
          <option>IT</option>
          <option>Дизайн</option>
          <option>Продажі</option>
        </select>

        <select
          value={workFormat}
          onChange={(e) => setWorkFormat(e.target.value)}
        >
          <option>Усі</option>
          <option>В офісі</option>
          <option>Віддалено</option>
          <option>Гібридно</option>
        </select>
      </div>

      <h2>Знайдено вакансій: {filteredVacancies.length}</h2>

      {filteredVacancies.length > 0 ? (
        <div className="vacancies-list">
          {filteredVacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>
      ) : (
        <p>Вакансій не знайдено</p>
      )}
    </main>
  );
}