import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SiteHeader() {
  const navigate = useNavigate();
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate('/')} aria-label="JellyJob — головна">
        <span className="brand-mark">JJ</span>
        <span className="brand-name">JellyJob</span>
      </button>

      <nav className="main-nav" aria-label="Головна навігація">
        <button type="button" onClick={() => navigate('/')}>Вакансії</button>
        <button type="button" onClick={() => navigate('/choose-role')}>Роботодавці</button>
        <button type="button" onClick={() => navigate('/#about')}>Про нас</button>
        <div className="language-picker">
          <button
            type="button"
            className="language-trigger"
            onClick={() => setLanguageOpen((value) => !value)}
            aria-expanded={languageOpen}
          >
            Українська <span className="chevron">⌄</span>
          </button>
          {languageOpen && (
            <div className="language-menu">
              <button type="button" onClick={() => setLanguageOpen(false)}>Українська</button>
              <button type="button" onClick={() => setLanguageOpen(false)}>Slovenčina</button>
              <button type="button" onClick={() => setLanguageOpen(false)}>English</button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
