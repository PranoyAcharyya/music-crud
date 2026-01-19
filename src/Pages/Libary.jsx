import { useState } from "react";
import UploadZone from "../components/UploadZone";
import MusicTable from "../components/MusicTable";
import MusicGrid from "../components/MusicGrid";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [view, setView] = useState("table");
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Library</h1>

        <button
          className="bg-green-500 px-4 py-2 rounded"
          onClick={() => navigate("/player")}
        >
          Open Player
        </button>
      </div>

      <UploadZone />

      <div className="mt-4 flex justify-end">
        <button
          className="bg-gray-800 px-4 py-2 rounded mr-2"
          onClick={() => setView("table")}
        >
          Table View
        </button>
        <button
          className="bg-gray-800 px-4 py-2 rounded"
          onClick={() => setView("grid")}
        >
          Grid View
        </button>
      </div>

      {view === "table" ? <MusicTable /> : <MusicGrid />}
    </div>
  );
}
