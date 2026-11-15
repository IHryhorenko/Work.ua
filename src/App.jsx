import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChooseRolePage from './pages/ChooseRolePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import HomePage from './pages/HomePage';
import EmployerReviewsPage from './pages/EmployerReviewsPage';
import CandidateReviewsPage from './pages/CandidateReviewsPage';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function DashboardPage() {
  return (
    <div className="simple-page">
      <h1>JellyJob</h1>
      <p>Ви увійшли в захищений розділ.</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="simple-page">
      <h2>Сторінку не знайдено</h2>
      <Link to="/">На головну</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/choose-role" element={<ChooseRolePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employer/reviews" element={<EmployerReviewsPage />} />
          <Route path="/candidate/reviews" element={<CandidateReviewsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
