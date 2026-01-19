import SidebarPlaylist from "../components/SidebarPlaylist";
import BottomPlayer from "../components/BottomPlayer";

export default function Player() {
  return (
    <div className="flex h-screen bg-black text-white">
      <SidebarPlaylist />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center text-3xl">
          🎶 Now Playing
        </div>
        <BottomPlayer />
      </div>
    </div>
  );
}
