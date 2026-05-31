import { useEffect, useState } from "react";
import { getStoredSession, login, logout } from "./api/authApi.js";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSession(getStoredSession());
  }, []);

  async function handleLogin(credentials) {
    setIsLoading(true);
    setError("");

    try {
      const nextSession = await login(credentials);
      setSession(nextSession);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    logout();
    setSession(null);
  }

  if (!session) {
    return (
      <LoginPage
        error={error}
        isLoading={isLoading}
        onLogin={handleLogin}
      />
    );
  }

  return <IndexPage session={session} onLogout={handleLogout} />;
}

