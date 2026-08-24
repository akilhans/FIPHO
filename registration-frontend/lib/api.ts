export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/+$/, "");

interface Tokens {
  access: string;
  refresh: string;
}

export function getTokens(): Tokens | null {
  if (typeof window === "undefined") return null;
  const access = localStorage.getItem("access_token");
  const refresh = localStorage.getItem("refresh_token");
  if (!access || !refresh) return null;
  return { access, refresh };
}

export function setTokens(tokens: Tokens) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

async function refreshAccessToken(): Promise<string | null> {
  const tokens = getTokens();
  if (!tokens) return null;

  try {
    const res = await fetch(`${API_BASE}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: tokens.refresh }),
      credentials: "include",
    });

    if (!res.ok) {
      clearTokens();
      return null;
    }

    const data = await res.json();
    setTokens({ access: data.access, refresh: data.refresh || tokens.refresh });
    return data.access;
  } catch {
    clearTokens();
    return null;
  }
}

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const tokens = getTokens();
  const headers = new Headers(options.headers);

  if (tokens) {
    headers.set("Authorization", `Bearer ${tokens.access}`);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401 && tokens) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      headers.set("Authorization", `Bearer ${newAccess}`);
      return fetch(`${API_BASE}${path}`, { ...options, headers });
    }
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
  }

  return res;
}

export async function login(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!res.ok) return false;

    const data = await res.json();
    setTokens({ access: data.access, refresh: data.refresh });
    return true;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/logout/`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Ignore network errors — local cleanup still happens below.
  }
  clearTokens();
}

export async function fetchMediaUrl(path: string): Promise<string | null> {
  const mediaPath = normalizeMediaPath(path);
  if (!mediaPath) return null;

  try {
    const res = await apiFetch(mediaPath);
    if (!res.ok) return null;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

function normalizeMediaPath(path: string): string | null {
  const value = path.trim();
  if (!value) return null;

  try {
    const parsed = new URL(value, API_BASE);
    let mediaPath = parsed.pathname;

    if (!mediaPath.startsWith("/media/")) {
      mediaPath = `/media/${mediaPath.replace(/^\/+/, "")}`;
    }

    if (mediaPath === "/media/" || !mediaPath.startsWith("/media/")) {
      return null;
    }

    return `${mediaPath}${parsed.search}`;
  } catch {
    return null;
  }
}

export function resolveApiUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
