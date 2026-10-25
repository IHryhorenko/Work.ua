import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query.trim()) {
      params.set('query', query.trim());
    }

    if (city.trim()) {
      params.set('city', city.trim());
    }

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div>
      <header>
        <h1>Work.ua</h1>

        <nav>
          <button onClick={() => navigate('/')}>
            Головна
          </button>

          <button onClick={() => navigate('/login')}>
            Увійти
          </button>

          <button onClick={() => navigate('/register')}>
            Реєстрація
          </button>
        </nav>
      </header>

      <main>
        <h2>Знайди роботу</h2>
        <p>Шукай вакансії та знаходь нові можливості для кар'єри.</p>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Посада або ключові слова"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <input
            type="text"
            placeholder="Місто"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="submit">
            Знайти вакансії
          </button>
        </form>
      </main>
    </div>
  );
}