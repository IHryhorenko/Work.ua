
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createVacancy } from '../services/vacancyService';
import { useNotification } from '../components/NotificationProvider';

export default function CreateVacancyPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [form, setForm] = useState({
    title: '',
    description: '',
    city: '',
    salaryMin: '',
    salaryMax: '',
    currency: '0',
    employmentType: '0',
    workMode: '0',
    category: '0',
    experienceLevel: '0',
    skills: '',
  });

  const [loading, setLoading] = useState(false);

  // Оновлення значень форми
  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Відправлення вакансії на сервер
  async function handleSubmit(e) {
    e.preventDefault();

    const vacancyData = {
      title: form.title.trim(),
      description: form.description.trim(),
      city: form.city.trim(),

      salaryMin: form.salaryMin === '' ? null : Number(form.salaryMin),
      salaryMax: form.salaryMax === '' ? null : Number(form.salaryMax),

      currency: Number(form.currency),
      employmentType: Number(form.employmentType),
      workMode: Number(form.workMode),
      category: Number(form.category),
      experienceLevel: Number(form.experienceLevel),

      skills: form.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ''),
    };

    if (
      vacancyData.salaryMin !== null &&
      vacancyData.salaryMax !== null &&
      vacancyData.salaryMin > vacancyData.salaryMax
    ) {
      notify(
        'Мінімальна зарплата не може бути більшою за максимальну.',
        'error'
      );
      return;
    }

    setLoading(true);

    try {
      const createdVacancy = await createVacancy(vacancyData);

      if (!createdVacancy?.id) {
        throw new Error('Сервер не повернув ID створеної вакансії.');
      }

      notify('Вакансію успішно створено!', 'success');
      navigate(`/jobs/${createdVacancy.id}`);
    } catch (err) {
      notify(err.message || 'Не вдалося створити вакансію.', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <h1>Створення вакансії</h1>

      <p>
        <Link to="/">На головну</Link>
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Назва посади:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Місто:
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Опис вакансії:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            onInput={handleChange}
            required
            rows="6"
          />
        </label>

        <label>
          Мінімальна зарплата:
          <input
            type="number"
            name="salaryMin"
            value={form.salaryMin}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Максимальна зарплата:
          <input
            type="number"
            name="salaryMax"
            value={form.salaryMax}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </label>

        <label>
          Валюта:
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
          >
            <option value="0">PLN</option>
            <option value="1">UAH</option>
            <option value="2">USD</option>
            <option value="3">EUR</option>
          </select>
        </label>

        <label>
          Тип зайнятості:
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
          >
            <option value="0">Повна зайнятість</option>
            <option value="1">Часткова зайнятість</option>
            <option value="2">Контракт</option>
            <option value="3">Стажування</option>
          </select>
        </label>

        <label>
          Формат роботи:
          <select
            name="workMode"
            value={form.workMode}
            onChange={handleChange}
          >
            <option value="0">В офісі</option>
            <option value="1">Віддалено</option>
            <option value="2">Гібридно</option>
          </select>
        </label>

        <label>
          Категорія:
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
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

        <label>
          Досвід роботи:
          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
          >
            <option value="0">Без досвіду</option>
            <option value="1">Junior</option>
            <option value="2">Middle</option>
            <option value="3">Senior</option>
            <option value="4">Lead</option>
          </select>
        </label>

        <label>
          Навички:
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Наприклад: C#, SQL, React"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Створення...' : 'Створити вакансію'}
        </button>
      </form>
    </main>
  );
}
