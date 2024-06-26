import { getRefreshToken } from "./getRefreshToken";

interface FetchApiResult<T> {
  data: T | null;
  error: string | null;
}

interface FetchApiOptions {
  body?: any;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: Record<string, string>;
}

export const fetchApi = async <T>(
  endpoint: string,
  options: FetchApiOptions = {},
  setLoading?: (isLoading: boolean) => void
): Promise<FetchApiResult<T>> => {
  const code = window.localStorage.getItem("code");
  let access_token = window.localStorage.getItem("access_token");
  const refresh_token = window.localStorage.getItem("refresh_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
    Accept: `application/json`,

    ...options.headers,
  };

  if (!code || code == undefined) {
    window.localStorage.clear();
    return { data: null, error: "Failed to refresh token" };
  }

  if (!refresh_token || refresh_token == undefined) {
    const tokens = await getRefreshToken(code);

    window.localStorage.setItem("refresh_token", tokens.refresh_token);
    window.localStorage.setItem("access_token", tokens.access_token);
    headers["Authorization"] = `Bearer ${tokens.access_token}`;
  }

  const url = new URL(endpoint, "https://api.spotify.com/v1");

  const fetchOptions: RequestInit = {
    headers,
    method: options.method || "GET",
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    setLoading?.(true);
    let response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      setLoading?.(false);
      return { data: null, error: errorText || response.statusText };
    }

    const data = await response.json();
    setLoading?.(false);
    return { data, error: null };
  } catch (error) {
    setLoading?.(false);
    return { data: null, error: (error as Error).message };
  }
};
