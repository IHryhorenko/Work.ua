const API_URL = 'http://localhost:5000/api/profile';

async function request(endpoint = '', options = {}) {
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
    throw new Error('Не вдалося підключитися до сервера.');
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
    throw new Error(data?.message || data?.error || 'Не вдалося виконати запит.');
  }

  return data;
}

export function getProfile() {
  return request('', { method: 'GET' });
}

export function updateProfile(profile) {
  return request('', {
    method: 'PUT',
    body: JSON.stringify(profile),
  });
}
