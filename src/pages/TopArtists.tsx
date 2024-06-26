import { useEffect, useState } from "react";
import { DefaultLayout } from "../components/DefaultLayout";
import { fetchMultipleApis } from "../functions/fetchMultiple";

type RangeArtists = "short" | "medium" | "long";
type ActiveTab = "1" | "2" | "3";

function Artists() {
  const [recentArtists, setRecentArtists] = useState<any>();

  const [activeTab, setActiveTab] = useState<ActiveTab>("1");

  const fetchData = async (rangeArtists: RangeArtists = "long") => {
    const results = await fetchMultipleApis([
      `/v1/me/top/artists?time_range=${rangeArtists}_term`,
    ]);

    if (results && results[0].data) setRecentArtists(results[0].data);
  };
  const handleClickTab = (rangeArtists: RangeArtists, activeTab: ActiveTab) => {
    fetchData(rangeArtists);
    setActiveTab(activeTab);
  };

  useEffect(() => {
    fetchData();
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
                    Top Artists from your last year
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
                  {recentArtists?.items.map((artist: any) => (
                    <div className="flex flex-col items-center gap-5 max-h-60">
                      <img
                        src={artist.images[0].url}
                        width={180}
                        className="rounded-full h-[75%]"
                      />
                      <p className="text-xl">{artist.name}</p>
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

export default Artists;
