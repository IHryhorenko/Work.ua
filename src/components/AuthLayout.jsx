import SiteHeader from './SiteHeader';

export default function AuthLayout({ children, className = '' }) {
  return (
    <div className={`auth-page ${className}`}>
      <SiteHeader />
      {children}
    </div>
  );
}
