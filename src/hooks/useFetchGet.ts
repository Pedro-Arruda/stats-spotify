import { useEffect, useState } from "react";

interface FetchApiResult<T> {
  items: T | null;
  refetch: () => void;
}

export const useFetchGet = <T>(endpoint: string): FetchApiResult<T> => {
  const [items, setItems] = useState<T | null>(null);

  let code = window.localStorage.getItem("code");
  console.log(code);

  let access_token = window.localStorage.getItem("access_token");
  // let refresh_token = window.localStorage.getItem("refresh_token");

  const url = new URL(endpoint, "https://api.spotify.com/v1");

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          // accept: "application/json",
          // contentType: "application/json",
          authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status == 401) {
        const params = new URLSearchParams();
        params.append("client_id", "c476361d5a2240d49ace3f177be2903a");
        params.append("client_secret", "1bad2adff7e54200a89cd9b21c40fc32");
        params.append("grant_type", "authorization_code");
        params.append("redirect_uri", "http://localhost:5173/");
        params.append("code", code!);

        const result = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params,
        });

        const { access_token, refresh_token } = await result.json();

        if (access_token && refresh_token) {
          window.location.hash = "";
          window.localStorage.setItem("access_token", access_token);
          window.localStorage.setItem("refresh_token", refresh_token);
        }

        return useFetchGet(endpoint);
      }

      const data: T = await response.json();
      if (data) {
        setItems(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return { items, refetch };
};
