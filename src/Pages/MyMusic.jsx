import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../redux/musicSlice";

export default function MyMusics() {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => state.music.tracks);
  const currentTrackId = useSelector((state) => state.music.currentTrackId);
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const myTracks = tracks.filter((t) => t.userId === currentUserId);

  const [view, setView] = useState("grid");
  const audioRef = useRef(null);

  const currentIndex = myTracks.findIndex((t) => t.id === currentTrackId);
  const currentTrack = myTracks[currentIndex];

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const audio = audioRef.current;

    audio.pause();
    audio.src = currentTrack.url;
    audio.load();

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction:", err);
      });
    }
  }, [currentTrack]);

  const playTrack = (id) => {
    dispatch(setCurrentTrack(id));
  };

  const next = () => {
    if (currentIndex < myTracks.length - 1) {
      dispatch(setCurrentTrack(myTracks[currentIndex + 1].id));
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentTrack(myTracks[currentIndex - 1].id));
    }
  };

  const handleEnded = () => {
    next();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-2 sm:p-4 pb-24">
        <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          My Musics
        </h1>

        {/* VIEW TOGGLE */}
        <div className="flex justify-end gap-2 mb-3 sm:mb-4">
          <button
            className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded ${
              view === "list" ? "bg-green-600" : "bg-gray-800"
            }`}
            onClick={() => setView("list")}
          >
            List
          </button>
          <button
            className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded ${
              view === "grid" ? "bg-green-600" : "bg-gray-800"
            }`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
        </div>

        {myTracks.length === 0 ? (
          <p className="text-gray-400">You haven't uploaded any music yet.</p>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {myTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track.id)}
                className={`p-3 sm:p-4 rounded cursor-pointer ${
                  currentTrackId === track.id ? "bg-green-700" : "bg-gray-800"
                }`}
              >
                {track.thumbnail ? (
                  <img
                    src={track.thumbnail}
                    className="w-full h-28 sm:h-32 object-cover rounded"
                  />
                ) : (
                  <div className="text-4xl sm:text-5xl">🎵</div>
                )}
                <p className="mt-2 text-sm sm:text-base">{track.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2">Thumbnail</th>
                  <th>Name</th>
                  <th>Play</th>
                </tr>
              </thead>
              <tbody>
                {myTracks.map((track) => (
                  <tr
                    key={track.id}
                    className={`border-t border-gray-700 ${
                      currentTrackId === track.id ? "bg-green-900" : ""
                    }`}
                  >
                    <td className="p-2">
                      {track.thumbnail ? (
                        <img
                          src={track.thumbnail}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded"
                        />
                      ) : (
                        "🎵"
                      )}
                    </td>
                    <td className="p-2">{track.name}</td>
                    <td className="p-2">
                      <button
                        className="bg-green-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
                        onClick={() => playTrack(track.id)}
                      >
                        Play
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* BOTTOM PLAYER (RESPONSIVE) */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <span className="text-xl sm:text-2xl">🎵</span>
            <span className="text-sm sm:text-base truncate max-w-[150px] sm:max-w-none">
              {currentTrack.name}
            </span>
          </div>

          <audio
            ref={audioRef}
            controls
            onEnded={handleEnded}
            className="w-full sm:w-1/2"
          />

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="bg-gray-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
            >
              Prev
            </button>
            <button
              onClick={next}
              className="bg-gray-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
