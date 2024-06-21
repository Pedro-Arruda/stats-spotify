import { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import { fetchApi } from "../functions/fetchApi";
import { useFetchGet } from "../hooks/useFetchGet";

function Home() {
  const code = window.localStorage.getItem("code");
  //   const [code, setCode] = useState<string | null>(null);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>();
  const [recentArtists, setRecentArtists] = useState<RecentArtists>();
  const [recentTracks, setRecentTracks] = useState<RecentTracks>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const CLIENT_ID = "c476361d5a2240d49ace3f177be2903a";
  const REDIRECT_URI = "http://localhost:5173/";
  const SCOPES = "user-read-private user-top-read";
  const RESPONSE_TYPE = "code";

  //   async function fetchProfile() {
  //     setIsLoading(true);
  //     try {
  //       const result = await fetch("https://api.spotify.com/v1/me", {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const data = await result.json();
  //       setProfileInfo(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  const { items } = useFetchGet("/v1/me");

  //   async function fetchRecentArtists() {
  //     setIsLoading(true);
  //     try {
  //       const result = await fetch(
  //         "https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term",
  //         {
  //           method: "GET",
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       const data = await result.json();
  //       setRecentArtists(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   async function fetchRecentTracks() {
  //     setIsLoading(true);
  //     try {
  //       const result = await fetch(
  //         "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term",
  //         {
  //           method: "GET",
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       const data = await result.json();
  //       setRecentTracks(data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  useEffect(() => {
    if (!code) {
      const [, code] = window.location.href.split("code=");
      window.localStorage.setItem("code", code);
    }
  }, []);

  useEffect(() => {
    if (code) {
      // fetchProfile();
      //   fetchRecentArtists();
      //   fetchRecentTracks();
    }
  }, [code]);

  return (
    <div>
      {code ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`}
        >
          Login to Spotify
        </a>
      ) : (
        <DefaultLayout>
          <div className="flex justify-center">
            {isLoading ? (
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
                        Top Artists from you last year
                      </p>
                      <button
                        onClick={() => window.localStorage.removeItem("token")}
                        className="border-[1.5px] py-1 px-8 text-sm rounded-full font-bold"
                      >
                        SEE MORE
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      {recentArtists?.items.map((artist) => (
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
                        Top Artists from you last year
                      </p>
                      <button
                        onClick={() => window.localStorage.removeItem("token")}
                        className="border-[1.5px] py-1 px-8 text-sm rounded-full font-bold"
                      >
                        SEE MORE
                      </button>
                    </div>

                    <div className="flex flex-col gap-5">
                      {recentTracks?.items.map((track) => (
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
