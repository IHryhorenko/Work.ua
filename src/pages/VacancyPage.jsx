import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import VacancyCard from '../components/VacancyCard';
import { getVacancyById, getVacancies } from '../services/vacancyService';

const categories = {
  0: 'IT',
  1: 'Маркетинг',
  2: 'Продажі',
  3: 'Фінанси',
  4: 'Дизайн',
  5: 'Освіта',
  6: 'Медицина',
  7: 'Логістика',
  8: 'Будівництво',
  9: 'Сфера послуг',
  10: 'Інше',
};

const employmentTypes = {
  0: 'Повна зайнятість',
  1: 'Часткова зайнятість',
  2: 'Контракт',
  3: 'Стажування',
};

const workModes = {
  0: 'В офісі',
  1: 'Віддалено',
  2: 'Гібридно',
};

const experienceLevels = {
  0: 'Без досвіду',
  1: 'Junior',
  2: 'Middle',
  3: 'Senior',
  4: 'Lead',
};

const currencies = {
  0: 'PLN',
  1: 'UAH',
  2: 'USD',
  3: 'EUR',
};

export default function VacancyPage() {
  const { id } = useParams();

  const [vacancy, setVacancy] = useState(null);
  const [similarVacancies, setSimilarVacancies] = useState([]);

  const [saved, setSaved] = useState(() => {
    const savedVacancies = JSON.parse(
      localStorage.getItem('savedVacancies') || '[]'
    );

    return savedVacancies.includes(id);
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Завантаження вакансії та схожих вакансій
  useEffect(() => {
    async function loadVacancy() {
      setLoading(true);
      setError('');

      try {
        const data = await getVacancyById(id);

        setVacancy(data);

        // Отримання схожих вакансій за категорією
        if (data?.category !== undefined && data?.category !== null) {
          const similarData = await getVacancies({
            category: data.category,
            page: 1,
            pageSize: 5,
          });

          const similar = (similarData?.items || []).filter(
            (item) => String(item.id) !== String(id)
          );

          setSimilarVacancies(similar);
        } else {
          setSimilarVacancies([]);
        }
      } catch (err) {
        setError(err.message || 'Не вдалося завантажити вакансію');
        setVacancy(null);
      } finally {
        setLoading(false);
      }
    }

    loadVacancy();
  }, [id]);

  // Збереження або видалення вакансії зі списку обраних
  function toggleSaved() {
    const savedVacancies = JSON.parse(
      localStorage.getItem('savedVacancies') || '[]'
    );

    let updated;

    if (savedVacancies.includes(id)) {
      updated = savedVacancies.filter(
        (savedId) => savedId !== id
      );
    } else {
      updated = [...savedVacancies, id];
    }

    localStorage.setItem(
      'savedVacancies',
      JSON.stringify(updated)
    );

    setSaved(updated.includes(id));
  }

  if (loading) {
    return (
      <main className="page">
        <p>Завантаження вакансії...</p>
      </main>
    );
  }

  if (error || !vacancy) {
    return (
      <main className="page">
        <h1>Не вдалося завантажити вакансію</h1>
        <p>{error || 'Вакансію не знайдено.'}</p>
        <Link to="/jobs">Повернутися до вакансій</Link>
      </main>
    );
  }

  // Формування діапазону зарплати
  function formatSalary() {
    const { salaryMin, salaryMax, currency } = vacancy;

    if (salaryMin == null && salaryMax == null) {
      return 'Не вказано';
    }

    const currencyName = currencies[currency] || '';

    if (salaryMin != null && salaryMax != null) {
      return `${salaryMin} – ${salaryMax} ${currencyName}`;
    }

    if (salaryMin != null) {
      return `Від ${salaryMin} ${currencyName}`;
    }

    return `До ${salaryMax} ${currencyName}`;
  }

  return (
    <main className="page">
      <Link to="/jobs">Назад до вакансій</Link>

      <h1>{vacancy.title}</h1>

      <h2>{vacancy.companyName}</h2>

      <p>Місто: {vacancy.city || 'Не вказано'}</p>

      <p>Зарплата: {formatSalary()}</p>

      <p>
        Тип зайнятості:{' '}
        {employmentTypes[vacancy.employmentType] || 'Не вказано'}
      </p>

      <p>
        Формат роботи:{' '}
        {workModes[vacancy.workMode] || 'Не вказано'}
      </p>

      <p>
        Досвід:{' '}
        {experienceLevels[vacancy.experienceLevel] || 'Не вказано'}
      </p>

      <p>
        Категорія:{' '}
        {categories[vacancy.category] || 'Не вказано'}
      </p>

      <button type="button" onClick={toggleSaved}>
        {saved ? 'Видалити зі збережених' : 'Зберегти вакансію'}
      </button>

      <section>
        <h2>Опис вакансії</h2>
        <p>{vacancy.description || 'Опис відсутній.'}</p>
      </section>

      {vacancy.skills?.length > 0 && (
        <section>
          <h2>Навички</h2>
          <p>{vacancy.skills.join(', ')}</p>
        </section>
      )}

      <ApplicationForm vacancy={vacancy} />

      <section>
        <h2>Схожі вакансії</h2>

        {similarVacancies.length > 0 ? (
          <div className="vacancies-list">
            {similarVacancies.map((item) => (
              <VacancyCard key={item.id} vacancy={item} />
            ))}
          </div>
        ) : (
          <p>Схожих вакансій немає</p>
        )}
      </section>
    </main>
  );
}