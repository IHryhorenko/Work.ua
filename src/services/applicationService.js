
import { apiRequest } from './api';

// Надсилання заявки на вакансію
export async function createApplication(applicationData) {
  return apiRequest('/Application', {
    method: 'POST',
    body: JSON.stringify(applicationData),
  });
}

// Отримання власних заявок кандидата
export async function getMyApplications(filters = {}) {
  const params = new URLSearchParams();

  if (filters.page) {
    params.set('Page', filters.page);
  }

  if (filters.pageSize) {
    params.set('PageSize', filters.pageSize);
  }

  if (filters.status !== undefined && filters.status !== '') {
    params.set('Status', filters.status);
  }

  return apiRequest(`/Application/my?${params.toString()}`, {
    method: 'GET',
  });
}

// Отримання заявок на вакансію роботодавця
export async function getVacancyApplications(vacancyId, filters = {}) {
  const params = new URLSearchParams();

  if (filters.page) {
    params.set('Page', filters.page);
  }

  if (filters.pageSize) {
    params.set('PageSize', filters.pageSize);
  }

  return apiRequest(
    `/Application/vacancy/${vacancyId}?${params.toString()}`,
    {
      method: 'GET',
    }
  );
}

// Зміна статусу заявки
export async function updateApplicationStatus(id, status) {
  return apiRequest(`/Application/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

// Завантаження резюме кандидата
export async function downloadApplicationCv(id) {
  return apiRequest(`/Application/${id}/cv`, {
    method: 'GET',
  });
}
