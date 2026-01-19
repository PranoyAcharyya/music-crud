import { useDispatch, useSelector } from "react-redux";
import {
  addTrack,
  updateTrackName,
  deleteTrack,
  setCurrentTrack,
} from "../redux/musicSlice";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const uploadSchema = yup.object({
  audio: yup
    .mixed()
    .required("Audio file is required")
    .test("is-audio", "Only audio files allowed", (value) =>
      value ? value[0]?.type.startsWith("audio/") : false
    ),

  thumbnail: yup
    .mixed()
    .nullable()
    .test("is-image", "Thumbnail must be an image", (value) =>
      value ? value[0]?.type.startsWith("image/") : true
    ),
});

// (imports unchanged)

export default function UploadZone() {
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.music.tracks);
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const myTracks = tracks.filter((t) => t.userId === currentUserId);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(uploadSchema),
  });

  const audioFile = watch("audio")?.[0];
  const thumbnail = watch("thumbnail")?.[0];

  const onSubmit = (data) => {
    const audio = data.audio?.[0];
    const image = data.thumbnail?.[0];

    if (!audio) {
      toast.error("Audio file is required");
      return;
    }

    const audioUrl = URL.createObjectURL(audio);
    const imageUrl = image ? URL.createObjectURL(image) : null;

    dispatch(
      addTrack({
        id: uuid(),
        name: audio.name.replace(/\.[^/.]+$/, ""),
        url: audioUrl,
        thumbnail: imageUrl,
        userId: currentUserId,
      })
    );

    toast.success("Music uploaded successfully!");
    reset();
  };

  const startEdit = (track) => {
    setEditId(track.id);
    setEditName(track.name);
  };

  const saveEdit = () => {
    dispatch(updateTrackName({ id: editId, name: editName }));
    toast.success("Name updated");
    setEditId(null);
  };

  return (
    <div className="border-2 border-gray-700 p-3 sm:p-6 rounded-lg bg-gray-900">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Upload New Music
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
              setValue("audio", e.dataTransfer.files);
            }
          }}
          className="border-2 border-dashed border-gray-600 p-4 sm:p-6 text-center rounded-lg bg-black mb-4"
        >
          <p className="mb-1 sm:mb-2 text-sm sm:text-base">
            🎵 Drag & Drop Audio Here
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mb-2">or</p>

          <input
            type="file"
            accept="audio/*"
            {...register("audio")}
            className="text-xs sm:text-sm"
          />

          {errors.audio && (
            <p className="text-red-400 text-xs sm:text-sm mt-2">
              {errors.audio.message}
            </p>
          )}

          {audioFile && (
            <p className="mt-2 text-green-400 text-xs sm:text-sm">
              Selected: {audioFile.name}
            </p>
          )}
        </div>

        <div className="border border-gray-700 p-3 sm:p-4 rounded-lg bg-black mb-4">
          <label className="block mb-2 text-sm sm:text-base font-medium">
            Music Thumbnail (Optional)
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            className="text-xs sm:text-sm"
          />

          {errors.thumbnail && (
            <p className="text-red-400 text-xs sm:text-sm mt-2">
              {errors.thumbnail.message}
            </p>
          )}

          {thumbnail && (
            <div className="mt-3">
              <img
                src={URL.createObjectURL(thumbnail)}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                alt="thumbnail preview"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!audioFile}
          className={`w-full py-2 rounded font-semibold text-sm sm:text-base ${
            audioFile
              ? "bg-green-500 text-black"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Save Music
        </button>
      </form>

      <h3 className="text-base sm:text-lg font-semibold mt-6 sm:mt-8 mb-2 sm:mb-3">
        Your Uploaded Songs
      </h3>

      {myTracks.length === 0 ? (
        <p className="text-gray-400 text-sm sm:text-base">No uploads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-2">Thumbnail</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myTracks.map((track) => (
                <tr key={track.id} className="border-t border-gray-700">
                  <td className="p-2">
                    {track.thumbnail ? (
                      <img
                        src={track.thumbnail}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded"
                        alt="thumb"
                      />
                    ) : (
                      "🎵"
                    )}
                  </td>

                  <td className="p-2">
                    {editId === track.id ? (
                      <input
                        className="bg-black border p-1 text-sm"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    ) : (
                      track.name
                    )}
                  </td>

                  <td className="p-2 space-x-1 sm:space-x-2">
                    {editId === track.id ? (
                      <button
                        className="bg-green-500 px-2 py-1 rounded text-xs sm:text-sm"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 px-2 py-1 rounded text-xs sm:text-sm"
                        onClick={() => startEdit(track)}
                      >
                        Update
                      </button>
                    )}

                    <button
                      className="bg-red-500 px-2 py-1 rounded text-xs sm:text-sm"
                      onClick={() => {
                        dispatch(deleteTrack(track.id));
                        toast.success("Deleted");
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

