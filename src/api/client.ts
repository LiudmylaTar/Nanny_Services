// Локально: /api → Vite proxy. Продакшн: повний URL беку в .env
const API_URL =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? "/api" : "");

interface AuthTokensResponse {
  accessToken: string;
}

let refreshPromise: Promise<string | null> | null = null;

const NO_REFRESH_PATHS = ["/auth/login", "/auth/register", "/auth/refresh"];

export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function clearAccessToken() {
  localStorage.removeItem("accessToken");
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        clearAccessToken();
        return null;
      }

      const data = (await res.json()) as AuthTokensResponse;
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      clearAccessToken();
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function canRetryWithRefresh(path: string) {
  return !NO_REFRESH_PATHS.some((p) => path.startsWith(p));
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  isRetry = false
): Promise<T> {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && !isRetry && canRetryWithRefresh(path)) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return apiFetch<T>(path, options, true);
    }
    clearAccessToken();
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || res.statusText);
  }

  return res.json();
}
