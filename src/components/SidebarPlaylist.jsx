import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/musicSlice";

export default function SidebarPlaylist() {
  const tracks = useSelector(state => state.music.tracks);
  const currentId = useSelector(state => state.music.currentTrackId);
  const dispatch = useDispatch();

  return (
    <div className="w-64 bg-gray-900 p-4 overflow-y-auto">
      <h2 className="text-xl mb-4">Playlist</h2>

      {tracks.map(track => (
        <div
          key={track.id}
          className={`p-2 mb-2 cursor-pointer rounded ${
            currentId === track.id ? "bg-green-700" : "bg-gray-800"
          }`}
          onClick={() => dispatch(setCurrentTrack(track.id))}
        >
          {track.name}
        </div>
      ))}
    </div>
  );
}
