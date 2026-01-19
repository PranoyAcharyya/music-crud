import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/musicSlice";

export default function MusicGrid() {
  const tracks = useSelector(state => state.music.tracks);
  const currentId = useSelector(state => state.music.currentTrackId);
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {tracks.map(track => (
        <div
          key={track.id}
          className={`p-4 rounded-lg cursor-pointer ${
            currentId === track.id ? "bg-green-700" : "bg-gray-800"
          }`}
          onClick={() => dispatch(setCurrentTrack(track.id))}
        >
          {track.thumbnail ? (
            <img
              src={track.thumbnail}
              className="w-full h-32 object-cover rounded"
            />
          ) : (
            <div className="text-5xl">🎵</div>
          )}
          <p className="mt-2">{track.name}</p>
        </div>
      ))}
    </div>
  );
}
