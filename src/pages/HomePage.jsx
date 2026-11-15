import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('query', query.trim());
    if (city.trim()) params.set('city', city.trim());
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="home-page">
      <SiteHeader />
      <main className="home-hero">
        <p className="home-kicker">Знайди своє місце</p>
        <h1>Робота, яка <span>надихає</span></h1>
        <p className="home-description">Відкривай нові можливості та знаходь роботу своєї мрії разом із JellyJob.</p>
        <form className="home-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Посада або ключові слова"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <input
            type="text"
            placeholder="Місто"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button className="pill-button primary-pill" type="submit">Знайти вакансії</button>
        </form>
        <div className="home-actions">
          <button type="button" className="pill-button role-pill" onClick={() => navigate('/login')}>Увійти</button>
          <button type="button" className="pill-button role-pill" onClick={() => navigate('/choose-role')}>Створити акаунт</button>
        </div>
      </main>
      <section className="home-about" id="about">
        <h2>Твоя наступна можливість починається тут</h2>
        <p>JellyJob допомагає кандидатам знаходити роботу, а роботодавцям — талановитих людей.</p>
      </section>
    </div>
  );
}
