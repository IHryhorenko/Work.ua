
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import HomePage from './pages/HomePage';

import EmployerReviewsPage from './pages/EmployerReviewsPage';
import CandidateReviewsPage from './pages/CandidateReviewsPage';

import ProtectedRoute from './components/ProtectedRoute';

function DashboardPage() {
  return (
    <div>
      <h1>Work.ua</h1>
      <p>You are viewing the protected area.</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page not found</h2>
      <Link to="/login">Back to login</Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />

        <Route
          path="/auth/callback"
          element={<AuthCallbackPage />}
        />

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/employer/reviews"
            element={<EmployerReviewsPage />}
          />

          <Route
            path="/candidate/reviews"
            element={<CandidateReviewsPage />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
