import spotifyLogo from "../assets/logo-spotify.png";
import artistsIcon from "../assets/artists.svg";
import tracksIcon from "../assets/tracks.svg";
import recentIcon from "../assets/recent.svg";

export const Sidebar = () => {
  return (
    <div className="bg-neutral-950 w-24 py-10 flex-col justify-center items-center text-center text-sm h-screen">
      <div className="flex justify-center">
        <img src={spotifyLogo} width={70} />
      </div>

      <ul className="flex flex-col gap-5 mt-10">
        <div className="flex flex-col items-center gap-1">
          <img src={artistsIcon} width={22} />
          <li>Profile</li>
        </div>

        <div className="flex flex-col items-center gap-1">
          <img src={tracksIcon} width={22} />
          <li>Top Artists</li>
        </div>

        <div className="flex flex-col items-center gap-1">
          <img src={recentIcon} width={22} />
          <li>Recent</li>
        </div>
      </ul>
    </div>
  );
};
