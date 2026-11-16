
const API_URL = '/api';

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('accessToken')
          ? { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          : {}),
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
    const validationErrors = data?.errors
      ? Object.values(data.errors).flat().join(' ')
      : null;

    throw new Error(
      validationErrors ||
      data?.detail ||
      data?.message ||
      data?.title ||
      data?.error ||
      'Something went wrong.'
    );
  }

  return data;
}

// LOGIN
export async function login(email, password) {
  const data = await request('/Auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim(),
      password,
    }),
  });

  const accessToken =
    data?.accessToken ||
    data?.token ||
    data?.access_token ||
    data?.data?.accessToken;

  const refreshToken =
    data?.refreshToken ||
    data?.refresh_token ||
    data?.data?.refreshToken;

  if (!accessToken) {
    throw new Error('Сервер не повернув access token.');
  }

  localStorage.setItem('accessToken', accessToken);

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  return data;
}

// REGISTER CANDIDATE / EMPLOYER
export function register(
  email,
  password,
  role,
  firstName,
  lastName,
  companyName = '',
  companyWebsite = '',
  companyDescription = ''
) {
  const isEmployer = role === 'employer';

  const body = {
    email: email.trim(),
    password,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
  };

  if (isEmployer) {
    body.companyName = companyName.trim();
    body.companyWebsite = companyWebsite.trim();
    body.companyDescription = companyDescription.trim();
  }

  if (isEmployer && !body.companyName) {
    return Promise.reject(new Error('Вкажіть назву компанії.'));
  }

  return request(
    isEmployer
      ? '/Auth/register/employer'
      : '/Auth/register/candidate',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );
}

// FORGOT PASSWORD
export function forgotPassword(email) {
  return request('/Auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({
      email: email.trim(),
    }),
  });
}

// RESET PASSWORD
export function resetPassword(token, password) {
  return request('/Auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({
      token,
      newPassword: password,
    }),
  });
}

// EMAIL VERIFICATION
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

// GET CURRENT USER
export function getCurrentUser() {
  return request('/Account/me', { method: 'GET' });
}

// LOGOUT
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
