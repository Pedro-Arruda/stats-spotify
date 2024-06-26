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
        <li>
          <a href="/" className="flex flex-col items-center gap-1">
            <img src={recentIcon} width={22} />
            Profile
          </a>
        </li>

        <li>
          <a href="/artists" className="flex flex-col items-center gap-1">
            <img src={artistsIcon} width={22} />
            Top Artists
          </a>
        </li>

        <li>
          <a href="/tracks" className="flex flex-col items-center gap-1">
            <img src={tracksIcon} width={22} />
            Top Tracks
          </a>
        </li>
      </ul>
    </div>
  );
};
