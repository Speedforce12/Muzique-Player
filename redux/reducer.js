import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    playingTrack: null,
    playing: false,
    liked: false,
  },
};

export const ReducerSlice = createSlice({
  name: "music-player",
  initialState,
  reducers: {
    togglePlayingTrack: (state, action) => {
      state.playingTrack = action.payload;
    },
    startPlaying: (state) => { 
      state.playing = !state.playing
    },
    toggleLike: (state,action) => {
      state.liked = action.payload
    }

  },
});

export const { toggleLike,togglePlayingTrack, startPlaying } = ReducerSlice.actions;
export default ReducerSlice.reducer;
