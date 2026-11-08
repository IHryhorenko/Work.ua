
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EmployerCabinet from './pages/EmployerCabinet';

import JobsPage from './pages/JobsPage';
import VacancyPage from './pages/VacancyPage';
import CreateVacancyPage from './pages/CreateVacancyPage';
import MyApplicationsPage from './pages/MyApplicationsPage';

import ProtectedRoute from './components/ProtectedRoute';
import NotificationProvider from './components/NotificationProvider';

function DashboardPage() {
  return (
    <main className="dashboard-page">
      <h1>Work.ua</h1>
      <p>You are viewing the protected area.</p>

      <p><Link to="/profile">Мій профіль</Link></p>
      <p><Link to="/employer">Кабінет роботодавця</Link></p>
      <p><Link to="/jobs">Переглянути вакансії</Link></p>
      <p><Link to="/create-vacancy">Створити вакансію</Link></p>
      <p><Link to="/my-applications">Мої відгуки</Link></p>
    </main>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page not found</h2>
      <Link to="/">Back to HomePage</Link>
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>

          {/* Публічні сторінки */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Вакансії */}
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<VacancyPage />} />

          {/* Захищені сторінки */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/employer" element={<EmployerCabinet />} />
            <Route path="/create-vacancy" element={<CreateVacancyPage />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}
