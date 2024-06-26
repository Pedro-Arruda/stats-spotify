import { fetchApi } from "./fetchApi";
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

export const fetchMultipleApis = async <T>(
  endpoints: string[],
  options: FetchApiOptions = {},
  setLoading?: (isLoading: boolean) => void
): Promise<FetchApiResult<T>[] | null> => {
  setLoading?.(true);
  const code = window.localStorage.getItem("code");
  const refresh_token = window.localStorage.getItem("refresh_token");
  let access_token = window.localStorage.getItem("access_token");

  if (!code || code == undefined) {
    window.localStorage.clear();
    return null;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
    Accept: `application/json`,
    ...options.headers,
  };

  if (!refresh_token || refresh_token == undefined) {
    const tokens = await getRefreshToken(code);

    window.localStorage.setItem("refresh_token", tokens.refresh_token);
    window.localStorage.setItem("access_token", tokens.access_token);
    headers["Authorization"] = `Bearer ${tokens.access_token}`;
  }

  const initialResults = await Promise.all(
    endpoints.map((endpoint) => fetchApi<T>(endpoint, headers))
  );

  const hasAuthError = initialResults.some(
    (result) => result.error === "Failed to refresh token"
  );

  if (hasAuthError) {
    const tokens = await getRefreshToken(code!);

    if (tokens) {
      const refreshedResults = await Promise.all(
        endpoints.map((endpoint) => fetchApi<T>(endpoint, options))
      );

      setLoading?.(false);
      return refreshedResults;
    } else {
      setLoading?.(false);
      return endpoints.map(() => ({
        data: null,
        error: "Failed to refresh token",
      }));
    }
  }

  setLoading?.(false);
  return initialResults;
};
