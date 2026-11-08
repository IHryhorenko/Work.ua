
import { apiRequest } from './api';

// Отримання списку вакансій із фільтрами
export async function getVacancies(filters = {}) {
  const params = new URLSearchParams();

  if (filters.search?.trim()) {
    params.set('Search', filters.search.trim());
  }

  if (filters.city?.trim()) {
    params.set('City', filters.city.trim());
  }

  if (filters.employmentType !== undefined && filters.employmentType !== '') {
    params.set('EmploymentType', filters.employmentType);
  }

  if (filters.workMode !== undefined && filters.workMode !== '') {
    params.set('WorkMode', filters.workMode);
  }

  if (filters.salaryFrom !== undefined && filters.salaryFrom !== '') {
    params.set('SalaryFrom', filters.salaryFrom);
  }

  if (filters.currency !== undefined && filters.currency !== '') {
    params.set('Currency', filters.currency);
  }

  if (filters.category !== undefined && filters.category !== '') {
    params.set('Category', filters.category);
  }

  if (filters.experienceLevel !== undefined && filters.experienceLevel !== '') {
    params.set('ExperienceLevel', filters.experienceLevel);
  }

  if (filters.skills?.trim()) {
    filters.skills.split(',').forEach((skill) => {
      const value = skill.trim();

      if (value) {
        params.append('Skills', value);
      }
    });
  }

  if (filters.sortBy !== undefined) {
    params.set('SortBy', filters.sortBy);
  }

  if (filters.desc !== undefined) {
    params.set('Desc', filters.desc);
  }

  params.set('Page', filters.page || 1);
  params.set('PageSize', filters.pageSize || 10);

  return apiRequest(`/Vacancy/search?${params.toString()}`, {
    method: 'GET',
  });
}

// Отримання вакансії за ID
export async function getVacancyById(id) {
  return apiRequest(`/Vacancy/${id}`, {
    method: 'GET',
  });
}

// Створення вакансії
export async function createVacancy(vacancyData) {
  return apiRequest('/Vacancy', {
    method: 'POST',
    body: JSON.stringify(vacancyData),
  });
}

// Отримання власних вакансій роботодавця
export async function getMyVacancies(filters = {}) {
  const params = new URLSearchParams();

  params.set('Page', filters.page || 1);
  params.set('PageSize', filters.pageSize || 10);

  return apiRequest(`/Vacancy/my?${params.toString()}`, {
    method: 'GET',
  });
}

// Публікація вакансії
export async function publishVacancy(id) {
  return apiRequest(`/Vacancy/${id}/publish`, {
    method: 'POST',
  });
}

// Закриття вакансії
export async function closeVacancy(id) {
  return apiRequest(`/Vacancy/${id}/close`, {
    method: 'POST',
  });
}

// Оновлення вакансії
export async function updateVacancy(id, vacancyData) {
  return apiRequest(`/Vacancy/${id}`, {
    method: 'PUT',
    body: JSON.stringify(vacancyData),
  });
}
