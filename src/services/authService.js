
const API_URL = 'http://localhost:5000/api/auth';

async function request(endpoint, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
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
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function register(email, password, role) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  });
}

export function forgotPassword(email) {
  return request('/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token, password) {
  return request('/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });
}

export function verifyEmail(token) {
  return request('/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

export function resendVerification(email) {
  return request('/resend-verification', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function getCurrentUser() {
  return request('/me', {
    method: 'GET',
  });
}

export function logout() {
  return request('/logout', {
    method: 'POST',
  });
}
