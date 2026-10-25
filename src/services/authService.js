const API_URL = `${import.meta.env.VITE_API_URL}/api`;

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      // Не використовуємо cookies, оскільки бекенд повертає JWT-токени.
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
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

export function login(email, password) {
  return request('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function register(email, password, role) {
  if (role === 'employer') {
    throw new Error(
      'Employer registration requires company and personal details.'
    );
  }

  return request('/Auth/register/candidate', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      firstName: '',
      lastName: '',
    }),
  });
}

export function forgotPassword(email) {
  return request('/Auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token, password) {
  return request('/Auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({
      token,
      newPassword: password,
    }),
  });
}

export function verifyEmail(token) {
  return Promise.reject(
    new Error('Email verification is not implemented in the backend.')
  );
}

export function resendVerification(email) {
  return Promise.reject(
    new Error('Resending verification is not implemented in the backend.')
  );
}

export function getCurrentUser() {
  const token = localStorage.getItem('accessToken');

  return request('/Account/me', {
    method: 'GET',
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
}

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