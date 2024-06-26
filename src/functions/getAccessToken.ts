export const getAccessToken = async (refresh_token: string) => {
  const paramsRefresh = new URLSearchParams();
  paramsRefresh.append("client_id", import.meta.env.APP_CLIENT_ID);
  paramsRefresh.append("client_secret", import.meta.env.APP_CLIENT_SECRET);
  paramsRefresh.append("grant_type", "refresh_token");
  paramsRefresh.append("refresh_token", refresh_token);
  paramsRefresh.append("redirect_uri", import.meta.env.APP_REDIRECT_URI);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: paramsRefresh,
  });

  if (response.status == 401) {
    window.localStorage.clear();
    throw new Error("Auth error");
  }

  const { access_token } = await response.json();

  return { refresh_token, access_token };
};
