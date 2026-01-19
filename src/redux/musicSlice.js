import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const saved = loadFromStorage("music");

const initialState = saved || {
  tracks: [],
  currentTrackId: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    addTrack: (state, action) => {
      state.tracks.push(action.payload);
      saveToStorage("music", state);
    },
    updateTrackName: (state, action) => {
      const { id, name } = action.payload;
      const track = state.tracks.find((t) => t.id === id);
      if (track) track.name = name;
      saveToStorage("music", state);
    },

    deleteTrack: (state, action) => {
      state.tracks = state.tracks.filter((t) => t.id !== action.payload);
      saveToStorage("music", state);
    },

    setCurrentTrack: (state, action) => {
      state.currentTrackId = action.payload;
      saveToStorage("music", state);
    },
  },
});

export const { addTrack, updateTrackName, deleteTrack, setCurrentTrack } =
  musicSlice.actions;

export default musicSlice.reducer;
