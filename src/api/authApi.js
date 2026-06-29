const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const HAS_API_BASE_URL = Boolean(API_BASE_URL);
const STORAGE_KEY = "helpdesk_session";

const demoAccounts = {
  "admin@company.com": {
    fullName: "Helpdesk Admin",
    email: "admin@company.com",
    role: "Admin",
    password: "Admin123!"
  },
  "adam.diab@company.com": {
    fullName: "Adam Diab",
    email: "adam.diab@company.com",
    role: "IT Support Agent",
    password: "Agent123!"
  },
  "issam.fawaz@company.com": {
    fullName: "Issam Fawaz",
    email: "issam.fawaz@company.com",
    role: "Employee",
    password: "Employee123!"
  },
  "manager@company.com": {
    fullName: "Support Manager",
    email: "manager@company.com",
    role: "Manager",
    password: "Manager123!"
  }
};

export function getStoredSession() {
  const value = localStorage.getItem(STORAGE_KEY);
  return value ? JSON.parse(value) : null;
}

export async function login(credentials) {
  try {
    if (!HAS_API_BASE_URL) {
      throw new Error("API base URL is not configured.");
    }

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const session = await response.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return session;
    }
  } catch {}

  const account = demoAccounts[credentials.email.toLowerCase()];

  if (!account || account.password !== credentials.password) {
    throw new Error("Invalid email or password.");
  }

  const session = {
    token: "frontend-demo-token",
    fullName: account.fullName,
    email: account.email,
    role: account.role,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}
