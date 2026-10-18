
export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const apiUrl =
      import.meta.env.VITE_API_URL || 'http://localhost:5000';

    window.location.assign(
      `${apiUrl}/api/auth/google`
    );
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      style={{
        width: '100%',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      Continue with Google
    </button>
  );
}
