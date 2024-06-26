import { errorToast } from "../components/Toast";

interface FetchApiResult<T> {
  data: T;
}

export const fetchApi = async <T>(
  endpoint: string,
  body: any,
  // auth: IAuth,
  // updateAuth: (auth: IAuth | null) => void,
  method: "POST" | "PATCH" | "PUT" | "DELETE" = "POST"
): Promise<FetchApiResult<T>> => {
  const headers: Record<string, string> = {};
  headers["Content-Type"] = "application/json";

  const url = new URL(endpoint, "https://api.spotify.com/v1");

  const options: RequestInit = {
    headers,
    method,
    body,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();
    errorToast(error.message);
  }

  if (response.status == 401) {
    const params = new URLSearchParams();
    params.append("client_id", "c476361d5a2240d49ace3f177be2903a");
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", "http://localhost:5173/");
    // params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    console.log(result);

    const { access_token } = await result.json();

    if (access_token) {
      window.location.hash = "";
      window.localStorage.setItem("token", access_token);
    }

    return fetchApi(endpoint, body, method);
  }

  const data = await response.json();

  return { data };
};
