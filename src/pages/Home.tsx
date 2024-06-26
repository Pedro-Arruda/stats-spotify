import { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import { useLocation, useNavigate } from "react-router";
import { fetchMultipleApis } from "../functions/fetchMultiple";

function Home() {
  const location = useLocation();
  const [code, setCode] = useState<string | null>();

  const [profileInfo, setProfileInfo] = useState<any>();

  const [recentArtists, setRecentArtists] = useState<any>();

  const [recentTracks, setRecentTracks] = useState<any>();

  const navigate = useNavigate();

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = import.meta.env.APP_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.APP_REDIRECT_URI;
  const SCOPES =
    "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public";
  const RESPONSE_TYPE = "code";

  useEffect(() => {
    const codeLocalStorage = window.localStorage.getItem("code");

    if (!codeLocalStorage) {
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

  const fetchData = async () => {
    const results = await fetchMultipleApis([
      "/v1/me",
      "/v1/me/top/artists?limit=10&time_range=long_term",
      "/v1/me/top/tracks?limit=10&time_range=long_term",
    ]);

    if (results && results[0].data) setProfileInfo(results[0].data);
    if (results && results[1].data) setRecentArtists(results[1].data);
    if (results && results[2].data) setRecentTracks(results[2].data);
  };

  useEffect(() => {
    if (code) {
      fetchData();
    }
  }, [code]);

  return (
    <div>
      {!code ? (
        <div className="h-screen gap-5 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold text-neutral-100">SPOTIFY</p>
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
            className="bg-primary text-neutral-100 px-10 py-3 rounded-3xl uppercase font-bold"
          >
            Login to Spotify
          </a>
        </div>
      ) : (
        <DefaultLayout>
          <div className="flex justify-center">
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
                    onClick={() => {
                      setCode(null);
                      window.localStorage.clear();
                    }}
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
                    {recentArtists?.items.map((artist: any, i: number) => (
                      <div
                        className="flex gap-5 items-center"
                        key={`${i}-${artist.name}`}
                      >
                        <img src={artist.images[0].url} width={60} />
                        <p className="text-xl">{artist.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-5 flex-col flex-1 ">
                  <div className="flex justify-between">
                    <p className="font-bold text-2xl text-neutral-200">
                      Top Tracks from your last year
                    </p>
                    <button
                      onClick={() => window.localStorage.removeItem("token")}
                      className="border-[1.5px] py-1 px-8 text-sm rounded-full font-bold"
                    >
                      SEE MORE
                    </button>
                  </div>

                  <div className="flex flex-col gap-5">
                    {recentTracks?.items.map((track: any, i: number) => (
                      <div
                        className="flex gap-5 items-center"
                        key={`${i}-${track.name}`}
                      >
                        <img src={track.album.images[0].url} width={60} />
                        <p className="text-xl">{track.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
    </div>
  );
}

export default Home;
