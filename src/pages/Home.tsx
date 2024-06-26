import { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import { useLocation, useNavigate } from "react-router";
import { fetchApi } from "../functions/fetchApi";

function Home() {
  const location = useLocation();
  const [code, setCode] = useState<string | null>();

  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>();
  const [recentArtists, setRecentArtists] = useState<RecentArtists | null>();
  const [recentTracks, setRecentTracks] = useState<RecentTracks | null>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "c476361d5a2240d49ace3f177be2903a";
  const REDIRECT_URI = "http://localhost:5173/";
  const SCOPES = "user-read-private user-top-read";
  const RESPONSE_TYPE = "code";

  const fetchProfileInfo = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchApi<ProfileInfo>(
      "/v1/me",
      { method: "GET" },
      setLoading
    );

    if (result.error) {
      setError(result.error);
    } else {
      setProfileInfo(result.data);
    }
  };

  const fetchRecentArtist = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchApi<RecentArtists>(
      "/v1/me/top/artists?limit=10&time_range=long_term",
      { method: "GET" },
      setLoading
    );

    if (result.error) {
      setError(result.error);
    } else {
      setRecentArtists(result.data);
    }
  };

  const fetchRecentTracks = async () => {
    setLoading(true);
    setError(null);

    const result = await fetchApi<RecentTracks>(
      "/v1/me/top/tracks?limit=10&time_range=long_term",
      { method: "GET" },
      setLoading
    );

    if (result.error) {
      setError(result.error);
    } else {
      setRecentTracks(result.data);
    }
  };

  useEffect(() => {
    const codeLocalStorage = window.localStorage.getItem("code");

    if (!codeLocalStorage) {
      console.log("IF CODE", code);

      const searchParams = new URLSearchParams(location.search);
      const authCode = searchParams.get("code");

      if (authCode) {
        setCode(authCode);
        window.localStorage.setItem("code", authCode);
      }
    } else {
      setCode(codeLocalStorage);
    }
  }, [location]);

  useEffect(() => {
    if (code) {
      fetchProfileInfo();
      fetchRecentArtist();
      fetchRecentTracks();
    }
  }, [code]);

  return (
    <div>
      {!code ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
        >
          Login to Spotify
        </a>
      ) : (
        <DefaultLayout>
          <div className="flex justify-center">
            {loading ? (
              <p>LOADING</p>
            ) : (
              <div className="mt-5 flex flex-col items-center gap-5 w-3/4">
                {profileInfo && (
                  <>
                    <img
                      src={profileInfo?.images[0].url}
                      width={150}
                      className="rounded-full"
                    />
                    <div className="flex flex-col items-center">
                      <p className="text-primary font-bold text-2xl">
                        {profileInfo?.followers.total}
                      </p>
                      <p className="text-sm">FOLLOWERS</p>
                    </div>
                    <button
                      onClick={() => window.localStorage.removeItem("token")}
                      className="border-[1.5px] py-1 px-8 text-sm rounded-full font-bold"
                    >
                      LOGOUT
                    </button>
                  </>
                )}

                <div className="flex gap-16 w-full justify-between mt-5">
                  <div className="flex gap-5 flex-col flex-1 ">
                    <div className="flex justify-between">
                      <p className="font-bold text-2xl text-neutral-200">
                        Top Artists from your last year
                      </p>
                      <button
                        onClick={() => navigate("/artists")}
                        className="border-[1.5px] py-1 px-8 text-sm rounded-full font-bold"
                      >
                        SEE MORE
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      {recentArtists?.items.map((artist: any) => (
                        <div className="flex gap-5 items-center">
                          <img src={artist.images[0].url} width={60} />
                          <p className="text-xl">{artist.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-5 flex-col flex-1 ">
                    <div className="flex justify-between">
                      <p className="font-bold text-2xl text-neutral-200">
                        Top Artists from your last year
                      </p>
                      <button
                        onClick={() => window.localStorage.removeItem("token")}
                        className="border-[1.5px] py-1 px-8 text-sm rounded-full font-bold"
                      >
                        SEE MORE
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      {recentTracks?.items.map((track: any) => (
                        <div className="flex gap-5 items-center">
                          <img src={track.album.images[0].url} width={60} />
                          <p className="text-xl">{track.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DefaultLayout>
      )}
    </div>
  );
}

export default Home;
