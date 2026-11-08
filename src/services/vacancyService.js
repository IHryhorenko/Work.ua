
import { apiRequest } from './api';

// Отримання списку вакансій із фільтрами
export async function getVacancies(filters = {}) {
  const params = new URLSearchParams();

  // Пошук за назвою вакансії або компанією
  if (filters.search?.trim()) {
    params.set('Search', filters.search.trim());
  }

  // Місто
  if (filters.city?.trim()) {
    params.set('City', filters.city.trim());
  }

  // Тип зайнятості
  if (filters.employmentType !== '') {
    params.set('EmploymentType', filters.employmentType);
  }

  // Формат роботи
  if (filters.workMode !== '') {
    params.set('WorkMode', filters.workMode);
  }

  // Мінімальна зарплата
  if (filters.salaryFrom !== '') {
    params.set('SalaryFrom', filters.salaryFrom);
  }

  // Валюта
  if (filters.currency !== '') {
    params.set('Currency', filters.currency);
  }

  // Категорія
  if (filters.category !== '') {
    params.set('Category', filters.category);
  }

  // Досвід роботи
  if (filters.experienceLevel !== '') {
    params.set('ExperienceLevel', filters.experienceLevel);
  }

  // Навички
  if (filters.skills?.trim()) {
    filters.skills.split(',').forEach((skill) => {
      const value = skill.trim();

      if (value) {
        params.append('Skills', value);
      }
    });
  }

  // Сортування
  if (filters.sortBy !== undefined) {
    params.set('SortBy', filters.sortBy);
  }

  if (filters.desc !== undefined) {
    params.set('Desc', filters.desc);
  }

  // Пагінація
  params.set('Page', filters.page || 1);
  params.set('PageSize', filters.pageSize || 10);

  return apiRequest(`/Vacancy/search?${params.toString()}`, {
    method: 'GET',
  });
}

// Отримання конкретної вакансії
export async function getVacancyById(id) {
  return apiRequest(`/Vacancy/${id}`, {
    method: 'GET',
  });
}
