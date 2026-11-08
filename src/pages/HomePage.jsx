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

    const searchParams = params.toString();

    navigate(searchParams ? `/jobs?${searchParams}` : '/jobs');
  };

  return (
    <div>
      <header>
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Work.ua
        </h1>

        <nav>
          <button onClick={() => navigate('/')}>
            Головна
          </button>

          <button onClick={() => navigate('/profile')}>
            Мій профіль
          </button>

          <button onClick={() => navigate('/create-vacancy')}>
            Створити вакансію
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
        
        <p>
          Шукай вакансії та знаходь нові можливості для кар'єри
        </p>

        <button onClick={() => navigate('/jobs')}>
          Переглянути всі вакансії
        </button>
      </main>
    </div>
  );
}