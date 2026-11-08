
const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, '');

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL не налаштовано');
}

const API_URL = API_BASE_URL.endsWith('/api')
  ? API_BASE_URL
  : `${API_BASE_URL}/api`;

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function getErrorMessage(data, status) {
  if (data?.errors) {
    return Object.values(data.errors).flat().join('. ');
  }

  if (data?.detail) return data.detail;
  if (data?.message) return data.message;
  if (data?.title) return data.title;

  const messages = {
    400: 'Неправильно заповнені дані',
    401: 'Необхідно увійти в акаунт',
    403: 'У вас немає доступу до цієї дії',
    404: 'Запитаний ресурс не знайдено',
    409: 'Виник конфлікт даних',
    422: 'Не вдалося обробити надіслані дані',
    500: 'Внутрішня помилка сервера',
    502: 'Сервер тимчасово недоступний',
    503: 'Сервіс тимчасово недоступний',
  };

  return messages[status] || 'Сталася невідома помилка';
}

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError(
      'Не вдалося підключитися до сервера. Перевірте інтернет-з’єднання'
    );
  }

  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(data, response.status),
      response.status,
      data
    );
  }

  return data;
}
