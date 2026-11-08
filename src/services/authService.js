import { apiRequest } from './api';

// Збереження токенів після авторизації
function saveTokens(data) {
  if (data?.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
  }

  if (data?.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }
}

// Вхід
export async function login(email, password) {
  const data = await apiRequest('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  saveTokens(data);

  return data;
}

// Реєстрація
export async function register(email, password, role, details = {}) {
  const isEmployer = role === 'employer';

  const endpoint = isEmployer
    ? '/Auth/register/employer'
    : '/Auth/register/candidate';

  const body = isEmployer
    ? {
        email,
        password,
        firstName: details.firstName,
        lastName: details.lastName,
        companyName: details.companyName,
        companyWebsite: details.companyWebsite || '',
        companyDescription: details.companyDescription || '',
      }
    : {
        email,
        password,
        firstName: details.firstName,
        lastName: details.lastName,
      };

  const data = await apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  saveTokens(data);

  return data;
}

// Забули пароль
export function forgotPassword(email) {
  return apiRequest('/Auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// Скидання пароля
export function resetPassword(token, password) {
  return apiRequest('/Auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({
      token,
      newPassword: password,
    }),
  });
}

// Отримання поточного користувача
export function getCurrentUser() {
  return apiRequest('/Account/me', {
    method: 'GET',
  });
}

// Вихід
export async function logout() {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    if (refreshToken) {
      await apiRequest('/Auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    }
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

// Підтвердження пошти
export function verifyEmail() {
  return Promise.reject(
    new Error('Email verification is not implemented in the backend.')
  );
}

// Повторне надсилання листа
export function resendVerification() {
  return Promise.reject(
    new Error('Email verification is not implemented in the backend.')
  );
}