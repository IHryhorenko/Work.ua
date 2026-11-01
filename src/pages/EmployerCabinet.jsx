import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EmployerCabinet.css';

const KEY = 'workua_employer_profile';
const empty = { companyName: '', industry: '', website: '', email: '', phone: '', city: '', address: '', contactPerson: '', description: '' };

export default function EmployerCabinet() {
  const [company, setCompany] = useState(empty);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const data = { ...empty, ...JSON.parse(saved) };
        setCompany(data);
        setForm(data);
      }
    } catch {
      setNotice('Не вдалося завантажити дані компанії.');
    }
  }, []);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function save(e) {
    e.preventDefault();
    const data = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()]));
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      setCompany(data);
      setForm(data);
      setEditing(false);
      setNotice('Дані компанії успішно збережено.');
    } catch {
      setNotice('Не вдалося зберегти дані.');
    }
  }

  function cancel() {
    setForm(company);
    setEditing(false);
    setNotice('');
  }

  const fields = [
    ['companyName', 'Назва компанії *', 'text', 'Наприклад, ТОВ «Компанія»'],
    ['industry', 'Сфера діяльності', 'text', 'IT, торгівля, виробництво'],
    ['website', 'Вебсайт', 'url', 'https://example.com'],
    ['city', 'Місто', 'text', 'Вкажіть місто'],
    ['email', 'Email для зв’язку', 'email', 'company@example.com'],
    ['phone', 'Телефон', 'tel', '+380...'],
    ['address', 'Адреса', 'text', 'Вулиця, будинок, офіс'],
    ['contactPerson', 'Контактна особа', 'text', 'Ім’я та прізвище'],
  ];

  return (
    <main className="employer-page">
      <header className="employer-topbar">
        <Link className="employer-brand" to="/">Work.ua</Link>
        <nav><Link to="/">Головна</Link><span>Кабінет роботодавця</span><Link to="/profile">Мій профіль</Link></nav>
      </header>
      <section className="employer-content">
        <div className="employer-heading">
          <div><p className="employer-eyebrow">WORK.UA / РОБОТОДАВЦЮ</p><h1>Кабінет роботодавця</h1><p>Керуйте інформацією про компанію та контактними даними.</p></div>
          {!editing && <button className="employer-btn primary" type="button" onClick={() => { setForm(company); setEditing(true); setNotice(''); }}>Редагувати дані</button>}
        </div>
        {notice && <div className="employer-notice" role="status">{notice}</div>}
        <form className="employer-card" onSubmit={save}>
          <div className="employer-company-head">
            <div className="employer-logo">{(company.companyName || 'К').charAt(0).toUpperCase()}</div>
            <div><h2>{company.companyName || 'Назва вашої компанії'}</h2><p>{company.industry || 'Сфера діяльності не вказана'}</p></div>
            <span className="employer-status">Профіль компанії</span>
          </div>
          <div className="employer-section"><h2>Інформація про компанію</h2><p>Основні відомості, які бачитимуть кандидати.</p></div>
          <div className="employer-fields">
            {fields.map(([name, label, type, placeholder]) => (
              <label key={name} className={['address', 'contactPerson'].includes(name) ? 'full' : ''}>
                <span>{label}</span><input name={name} type={type} value={form[name]} onChange={change} disabled={!editing} required={name === 'companyName'} placeholder={placeholder} maxLength={200} />
              </label>
            ))}
            <label className="full"><span>Опис компанії</span><textarea name="description" value={form.description} onChange={change} disabled={!editing} rows={5} maxLength={1500} placeholder="Розкажіть кандидатам про вашу компанію..." /><small>{form.description.length}/1500 символів</small></label>
          </div>
          {editing && <div className="employer-actions"><button className="employer-btn light" type="button" onClick={cancel}>Скасувати</button><button className="employer-btn primary" type="submit">Зберегти зміни</button></div>}
        </form>
        <p className="employer-hint">Дані зберігаються у цьому браузері. Для синхронізації між пристроями потрібне підключення серверного API.</p>
      </section>
    </main>
  );
}
