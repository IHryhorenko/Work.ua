import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getVacancies, saveVacancies } from '../data/vacancies';

export default function CreateVacancyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    company: '',
    city: '',
    salary: '',
    employment: 'Повна зайнятість',
    workFormat: 'В офісі',
    experience: 'Без досвіду',
    category: 'IT',
    description: '',
    responsibilities: '',
    requirements: '',
    conditions: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const vacancies = getVacancies();

    const newVacancy = {
      ...form,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    saveVacancies([...vacancies, newVacancy]);

    setMessage('Вакансію створено.');

    navigate(`/jobs/${newVacancy.id}`);
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
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Назва компанії:
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Місто:
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Зарплата:
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Наприклад: 25000 грн"
            required
          />
        </label>

        <label>
          Тип зайнятості:
          <select
            name="employment"
            value={form.employment}
            onChange={handleChange}
          >
            <option>Повна зайнятість</option>
            <option>Неповна зайнятість</option>
            <option>Проєктна робота</option>
            <option>Стажування</option>
          </select>
        </label>

        <label>
          Формат роботи:
          <select
            name="workFormat"
            value={form.workFormat}
            onChange={handleChange}
          >
            <option>В офісі</option>
            <option>Віддалено</option>
            <option>Гібридно</option>
          </select>
        </label>

        <label>
          Досвід:
          <select
            name="experience"
            value={form.experience}
            onChange={handleChange}
          >
            <option>Без досвіду</option>
            <option>1–2 роки</option>
            <option>2–5 років</option>
            <option>Понад 5 років</option>
          </select>
        </label>

        <label>
          Категорія:
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option>IT</option>
            <option>Дизайн</option>
            <option>Продажі</option>
            <option>Маркетинг</option>
            <option>Інше</option>
          </select>
        </label>

        <label>
          Опис вакансії:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </label>

        <label>
          Обов'язки:
          <textarea
            name="responsibilities"
            value={form.responsibilities}
            onChange={handleChange}
            required
            rows="4"
          />
        </label>

        <label>
          Вимоги:
          <textarea
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            required
            rows="4"
          />
        </label>

        <label>
          Умови роботи:
          <textarea
            name="conditions"
            value={form.conditions}
            onChange={handleChange}
            required
            rows="4"
          />
        </label>

        <button type="submit">Створити вакансію</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}