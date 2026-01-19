import { useSelector, useDispatch } from "react-redux";
import { deleteTrack, setCurrentTrack, updateTrackName } from "../redux/musicSlice";
import { useState } from "react";

export default function MusicTable() {
  const tracks = useSelector(state => state.music.tracks);
  const currentId = useSelector(state => state.music.currentTrackId);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");

  const startEdit = (id, oldName) => {
    setEditId(id);
    setName(oldName);
  };

  const saveEdit = (id) => {
    dispatch(updateTrackName({ id, name }));
    setEditId(null);
  };

  return (
    <table className="w-full mt-4 border border-gray-700">
      <thead>
        <tr className="bg-gray-900">
          <th className="p-2">Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {tracks.map(track => (
          <tr
            key={track.id}
            className={`border-t border-gray-700 ${
              currentId === track.id ? "bg-green-900" : ""
            }`}
          >
            <td className="p-2">
              {editId === track.id ? (
                <input
                  className="bg-black border p-1"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              ) : (
                track.name
              )}
            </td>

            <td className="p-2 space-x-2">
              {editId === track.id ? (
                <button
                  className="bg-green-500 px-2 py-1 rounded"
                  onClick={() => saveEdit(track.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 px-2 py-1 rounded"
                  onClick={() => startEdit(track.id, track.name)}
                >
                  Edit
                </button>
              )}

              <button
                className="bg-red-500 px-2 py-1 rounded"
                onClick={() => dispatch(deleteTrack(track.id))}
              >
                Delete
              </button>

              <button
                className="bg-green-600 px-2 py-1 rounded"
                onClick={() => dispatch(setCurrentTrack(track.id))}
              >
                Play
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
