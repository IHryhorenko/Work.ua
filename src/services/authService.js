const API_URL = `${import.meta.env.VITE_API_URL}/api`;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error('Unable to connect to the server.');
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
    throw new Error(
      data?.message || data?.error || 'Something went wrong.'
    );
  }

  return data;
}

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
  const data = await request('/Auth/login', {
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

  const data = await request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  saveTokens(data);

  return data;
}

// Забули пароль
export function forgotPassword(email) {
  return request('/Auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// Скидання пароля
export function resetPassword(token, password) {
  return request('/Auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({
      token,
      newPassword: password,
    }),
  });
}

// Отримання поточного користувача
export function getCurrentUser() {
  return request('/Account/me', {
    method: 'GET',
  });
}

// Вихід
export async function logout() {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    if (refreshToken) {
      await request('/Auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
    }
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export function verifyEmail() {
  return Promise.reject(
    new Error('Email verification is not implemented in the backend.')
  );
}

export function resendVerification() {
  return Promise.reject(
    new Error('Email verification is not implemented in the backend.')
  );
}