import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/profileService';
import './ProfilePage.css';

const emptyProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  city: '',
  birthDate: '',
  about: '',
};

function normalizeProfile(data) {
  const source = data?.profile ?? data?.user ?? data ?? {};
  return {
    firstName: source.firstName ?? source.first_name ?? '',
    lastName: source.lastName ?? source.last_name ?? '',
    email: source.email ?? '',
    phone: source.phone ?? source.phoneNumber ?? source.phone_number ?? '',
    city: source.city ?? '',
    birthDate: (source.birthDate ?? source.birth_date ?? '').slice(0, 10),
    about: source.about ?? source.description ?? '',
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(emptyProfile);
  const [form, setForm] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const data = await getProfile();
        if (!active) return;
        const normalized = normalizeProfile(data);
        setProfile(normalized);
        setForm(normalized);
      } catch (err) {
        if (active) setError(err.message || 'Не вдалося завантажити профіль.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function startEditing() {
    setForm(profile);
    setError('');
    setNotice('');
    setEditing(true);
  }

  function cancelEditing() {
    setForm(profile);
    setEditing(false);
    setError('');
    setNotice('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');

    try {
      const result = await updateProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        birthDate: form.birthDate || null,
        about: form.about.trim(),
      });

      const updated = normalizeProfile(result?.profile ?? result?.user ?? {
        ...form,
        email: profile.email,
      });
      setProfile(updated);
      setForm(updated);
      setEditing(false);
      setNotice('Зміни успішно збережено.');
    } catch (err) {
      setError(err.message || 'Не вдалося зберегти зміни.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="profile-page"><p className="profile-status">Завантаження профілю…</p></main>;
  }

  return (
    <main className="profile-page">
      <header className="profile-topbar">
        <Link className="profile-brand" to="/">Work.ua</Link>
        <nav aria-label="Навігація профілю">
          <Link to="/">Головна</Link>
          <span className="profile-nav-current">Мій профіль</span>
        </nav>
      </header>

      <section className="profile-content">
        <div className="profile-heading">
          <div>
            <p className="profile-eyebrow">ОСОБИСТИЙ КАБІНЕТ</p>
            <h1>Мій профіль</h1>
            <p className="profile-subtitle">Переглядайте та оновлюйте свої особисті дані.</p>
          </div>
          {!editing && (
            <button className="profile-button profile-button-primary" onClick={startEditing} type="button">
              Редагувати дані
            </button>
          )}
        </div>

        {error && <div className="profile-alert profile-alert-error" role="alert">{error}</div>}
        {notice && <div className="profile-alert profile-alert-success" role="status">{notice}</div>}

        <form className="profile-card" onSubmit={handleSubmit}>
          <div className="profile-card-heading">
            <div className="profile-avatar" aria-hidden="true">
              {(profile.firstName || profile.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{[profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Ваш профіль'}</h2>
              <p>{profile.email || 'Email не вказано'}</p>
            </div>
          </div>

          <div className="profile-section-title">
            <h2>Особисті дані</h2>
            <p>Поля з позначкою * обов’язкові.</p>
          </div>

          <div className="profile-fields">
            <label className="profile-field">
              <span>Ім’я *</span>
              <input name="firstName" value={form.firstName} onChange={handleChange} disabled={!editing} autoComplete="given-name" required maxLength={80} />
            </label>
            <label className="profile-field">
              <span>Прізвище *</span>
              <input name="lastName" value={form.lastName} onChange={handleChange} disabled={!editing} autoComplete="family-name" required maxLength={80} />
            </label>
            <label className="profile-field">
              <span>Email</span>
              <input name="email" type="email" value={form.email} disabled autoComplete="email" />
              <small>Email змінюється через окрему процедуру підтвердження.</small>
            </label>
            <label className="profile-field">
              <span>Номер телефону</span>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} disabled={!editing} autoComplete="tel" maxLength={30} placeholder="+421…" />
            </label>
            <label className="profile-field">
              <span>Місто</span>
              <input name="city" value={form.city} onChange={handleChange} disabled={!editing} autoComplete="address-level2" maxLength={100} placeholder="Вкажіть місто" />
            </label>
            <label className="profile-field">
              <span>Дата народження</span>
              <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} disabled={!editing} />
            </label>
            <label className="profile-field profile-field-full">
              <span>Про себе</span>
              <textarea name="about" value={form.about} onChange={handleChange} disabled={!editing} rows={4} maxLength={1000} placeholder="Коротко розкажіть про себе…" />
              <small>{form.about.length}/1000 символів</small>
            </label>
          </div>

          {editing && (
            <div className="profile-form-actions">
              <button className="profile-button profile-button-secondary" type="button" onClick={cancelEditing} disabled={saving}>
                Скасувати
              </button>
              <button className="profile-button profile-button-primary" type="submit" disabled={saving}>
                {saving ? 'Збереження…' : 'Зберегти зміни'}
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
