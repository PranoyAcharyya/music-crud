import { useSelector, useDispatch } from "react-redux";
import { setCurrentTrack } from "../redux/musicSlice";
import { useEffect, useRef } from "react";

export default function BottomPlayer() {
  const tracks = useSelector(state => state.music.tracks);
  const currentId = useSelector(state => state.music.currentTrackId);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  const currentIndex = tracks.findIndex(t => t.id === currentId);
  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.play();
    }
  }, [currentTrack]);

  const next = () => {
    if (currentIndex < tracks.length - 1) {
      dispatch(setCurrentTrack(tracks[currentIndex + 1].id));
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentTrack(tracks[currentIndex - 1].id));
    }
  };

  const handleEnded = () => {
    next(); // AUTO PLAY NEXT
  };

  return (
    <div className="bg-gray-900 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎵</span>
        <span>{currentTrack?.name || "No song selected"}</span>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.url}
        controls
        onEnded={handleEnded}
        className="w-1/2"
      />

      <div className="space-x-2">
        <button onClick={prev} className="bg-gray-700 px-3 py-1 rounded">
          Prev
        </button>
        <button onClick={next} className="bg-gray-700 px-3 py-1 rounded">
          Next
        </button>
      </div>
    </div>
  );
}
