export const getAccessToken = async (code: string) => {
  const paramsRefresh = new URLSearchParams();
  paramsRefresh.append("client_id", "c476361d5a2240d49ace3f177be2903a");
  paramsRefresh.append("client_secret", "1bad2adff7e54200a89cd9b21c40fc32");
  paramsRefresh.append("grant_type", "authorization_code");
  paramsRefresh.append("code", code);
  paramsRefresh.append("redirect_uri", "http://localhost:5173/");

  const responseRefresh = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: paramsRefresh,
    }
  );

  if (responseRefresh.status == 401) {
    window.localStorage.clear();
    throw new Error("Auth error");
  }

  const { refresh_token } = await responseRefresh.json();

  const params = new URLSearchParams();
  params.append("client_id", "c476361d5a2240d49ace3f177be2903a");
  params.append("client_secret", "1bad2adff7e54200a89cd9b21c40fc32");
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);
  params.append("redirect_uri", "http://localhost:5173/");

  const responseAccess = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (responseAccess.status == 401) {
    throw new Error("Auth error");
  }

  const { access_token } = await responseAccess.json();
  return { refresh_token, access_token };
};
