import { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import { fetchApi } from "../functions/fetchApi";
import { errorToast } from "../components/Toast";
import { formatText } from "../functions/formatText";

type RangeTracks = "short" | "medium" | "long";
type ActiveTab = "1" | "2" | "3";

function Tracks() {
  const [recentTracks, setRecentTracks] = useState<RecentTracks | null>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>("1");

  const fetchRecentTracks = async (rangeTracks: RangeTracks = "long") => {
    setLoading(true);
    setError(null);

    const result = await fetchApi<RecentTracks>(
      `/v1/me/top/tracks?time_range=${rangeTracks}_term`,
      { method: "GET" },
      setLoading
    );

    if (result.error) {
      setError(result.error);
      errorToast(error || "Error fetching tracks");
    } else {
      setRecentTracks(result.data);
    }
  };

  const handleClickTab = (rangeTracks: RangeTracks, activeTab: ActiveTab) => {
    fetchRecentTracks(rangeTracks);
    setActiveTab(activeTab);
  };

  useEffect(() => {
    fetchRecentTracks();
  }, []);

  return (
    <div>
      <DefaultLayout>
        <div className="flex justify-center">
          <div className="mt-5 flex flex-col items-center gap-5 w-3/4">
            <div className="flex gap-16 w-full justify-between mt-5">
              <div className="flex gap-5 flex-col flex-1 ">
                <div className="flex justify-between mb-10">
                  <p className="font-bold text-2xl text-neutral-200">
                    Top Tracks from your last year
                  </p>
                  <div className="flex gap-5">
                    <button
                      onClick={() => handleClickTab("long", "1")}
                      className={`${
                        activeTab == "1" && "border-b-[1px] border-neutral-200"
                      } `}
                    >
                      Last year
                    </button>
                    <button
                      onClick={() => handleClickTab("medium", "2")}
                      className={`${
                        activeTab == "2" && "border-b-[1px] border-neutral-200"
                      } `}
                    >
                      Last 6 months
                    </button>
                    <button
                      onClick={() => handleClickTab("short", "3")}
                      className={`${
                        activeTab == "3" && "border-b-[1px] border-neutral-200"
                      } `}
                    >
                      Last 4 weeks
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-10 justify-center">
                  {recentTracks?.items.map((track) => (
                    <div className="flex flex-col items-center gap-5 max-h-60">
                      <img
                        src={track.album.images[0].url}
                        width={180}
                        className="rounded-full h-[75%]"
                      />
                      <p className="text-xl">{formatText(track.name, 20)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Tracks;
