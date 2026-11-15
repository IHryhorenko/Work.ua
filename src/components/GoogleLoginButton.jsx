export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.assign(`${apiUrl}/api/auth/google`);
  };

  return (
    <button type="button" className="social-button google-social" onClick={handleGoogleLogin} aria-label="Увійти через Google" title="Google">
      G
    </button>
  );
}
