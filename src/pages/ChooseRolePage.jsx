import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export default function ChooseRolePage() {
  const navigate = useNavigate();

  const chooseRole = (role) => {
    sessionStorage.setItem('registrationRole', role);
    navigate('/register');
  };

  return (
    <AuthLayout className="role-page">
      <main className="role-content">
        <h1>Хто ти на <span>JellyJob?</span></h1>
        <div className="role-options">
          <section className="role-option">
            <h2>Я — роботодавець</h2>
            <p>Хочу знайти крутих людей у свою команду</p>
            <button className="pill-button role-pill" type="button" onClick={() => chooseRole('employer')}>
              Обрати
            </button>
          </section>
          <section className="role-option">
            <h2>Я — працівник</h2>
            <p>Шукаю роботу та нові можливості</p>
            <button className="pill-button role-pill" type="button" onClick={() => chooseRole('candidate')}>
              Обрати
            </button>
          </section>
        </div>
      </main>
    </AuthLayout>
  );
}
