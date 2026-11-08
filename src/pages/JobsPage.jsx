import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import VacancyCard from '../components/VacancyCard';
import { getVacancies } from '../services/vacancyService';

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get('query') || ''
  );
  const [city, setCity] = useState(
    searchParams.get('city') || ''
  );

  const [category, setCategory] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [salaryFrom, setSalaryFrom] = useState('');
  const [currency, setCurrency] = useState('');
  const [skills, setSkills] = useState('');

  const [sortBy, setSortBy] = useState('0');
  const [desc, setDesc] = useState('true');

  const [vacancies, setVacancies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Синхронізація форми з URL
  useEffect(() => {
    setSearch(searchParams.get('query') || '');
    setCity(searchParams.get('city') || '');
    setPage(1);
  }, [searchParams]);

  // Завантаження вакансій
  useEffect(() => {
    async function loadVacancies() {
      setLoading(true);
      setError('');

      try {
        const data = await getVacancies({
          search: searchParams.get('query') || '',
          city: searchParams.get('city') || '',

          category: searchParams.get('category') ?? '',
          workMode: searchParams.get('workMode') ?? '',
          employmentType: searchParams.get('employmentType') ?? '',
          experienceLevel: searchParams.get('experienceLevel') ?? '',

          salaryFrom: searchParams.get('salaryFrom') ?? '',
          currency: searchParams.get('currency') ?? '',
          skills: searchParams.get('skills') || '',

          sortBy: searchParams.get('sortBy') ?? 0,
          desc: searchParams.get('desc') !== 'false',

          page,
          pageSize: 10,
        });

        setVacancies(data?.items || []);
        setTotalCount(data?.totalCount || 0);
        setTotalPages(data?.totalPages || 1);
      } catch (err) {
        setError(err.message);
        setVacancies([]);
        setTotalCount(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    loadVacancies();
  }, [searchParams, page]);

  // Застосування фільтрів
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    const filters = {
      query: search.trim(),
      city: city.trim(),
      category,
      workMode,
      employmentType,
      experienceLevel,
      salaryFrom,
      currency,
      skills: skills.trim(),
      sortBy,
      desc,
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        params.set(key, value);
      }
    });

    setPage(1);
    setSearchParams(params);
  };

  // Скидання фільтрів
  const handleReset = () => {
    setSearch('');
    setCity('');
    setCategory('');
    setWorkMode('');
    setEmploymentType('');
    setExperienceLevel('');
    setSalaryFrom('');
    setCurrency('');
    setSkills('');
    setSortBy('0');
    setDesc('true');

    setPage(1);
    setSearchParams({});
  };

  // Перехід між сторінками
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <main className="page">
      <h1>Пошук вакансій</h1>

      <p>
        <Link to="/">На головну</Link>
      </p>

      <form onSubmit={handleSearch} className="filters">

        {/* Пошук за назвою та містом */}
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

        {/* Категорія */}
        <label>
          Категорія
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Усі категорії</option>
            <option value="0">IT</option>
            <option value="1">Маркетинг</option>
            <option value="2">Продажі</option>
            <option value="3">Фінанси</option>
            <option value="4">Дизайн</option>
            <option value="5">Освіта</option>
            <option value="6">Медицина</option>
            <option value="7">Логістика</option>
            <option value="8">Будівництво</option>
            <option value="9">Сфера послуг</option>
            <option value="10">Інше</option>
          </select>
        </label>

        {/* Формат роботи */}
        <label>
          Формат роботи
          <select
            value={workMode}
            onChange={(e) => setWorkMode(e.target.value)}
          >
            <option value="">Усі формати</option>
            <option value="0">В офісі</option>
            <option value="1">Віддалено</option>
            <option value="2">Гібридно</option>
          </select>
        </label>

        {/* Тип зайнятості */}
        <label>
          Тип зайнятості
          <select
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          >
            <option value="">Усі типи</option>
            <option value="0">Повна зайнятість</option>
            <option value="1">Часткова зайнятість</option>
            <option value="2">Контракт</option>
            <option value="3">Стажування</option>
          </select>
        </label>

        {/* Досвід */}
        <label>
          Досвід роботи
          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Будь-який досвід</option>
            <option value="0">Без досвіду</option>
            <option value="1">Junior</option>
            <option value="2">Middle</option>
            <option value="3">Senior</option>
            <option value="4">Lead</option>
          </select>
        </label>

        {/* Зарплата */}
        <label>
          Мінімальна зарплата
          <input
            type="number"
            min="0"
            placeholder="Наприклад, 1000"
            value={salaryFrom}
            onChange={(e) => setSalaryFrom(e.target.value)}
          />
        </label>

        {/* Валюта */}
        <label>
          Валюта
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Будь-яка валюта</option>
            <option value="0">PLN</option>
            <option value="1">UAH</option>
            <option value="2">USD</option>
            <option value="3">EUR</option>
          </select>
        </label>

        {/* Навички */}
        <label>
          Навички
          <input
            type="text"
            placeholder="React, JavaScript, SQL"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </label>

        {/* Сортування */}
        <label>
          Сортувати за
          <select
            value={`${sortBy}_${desc}`}
            onChange={(e) => {
              const [newSortBy, newDesc] = e.target.value.split('_');

              setSortBy(newSortBy);
              setDesc(newDesc);
            }}
          >
            <option value="0_true">Найновіші</option>
            <option value="0_false">Найстаріші</option>
            <option value="1_true">Зарплата за спаданням</option>
            <option value="1_false">Зарплата за зростанням</option>
          </select>
        </label>

        <div>
          <button type="submit">
            Знайти
          </button>

          <button type="button" onClick={handleReset}>
            Скинути фільтри
          </button>
        </div>
      </form>

      {/* Результати */}
      {loading ? (
        <p>Завантаження вакансій...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <h2>
            Знайдено вакансій: {totalCount}
          </h2>

          {vacancies.length > 0 ? (
            <div className="vacancies-list">
              {vacancies.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                />
              ))}
            </div>
          ) : (
            <p>Вакансій не знайдено</p>
          )}

          {/* Пагінація */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Попередня
              </button>

              <span>
                Сторінка {page} з {totalPages}
              </span>

              <button
                type="button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Наступна
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}