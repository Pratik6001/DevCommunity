import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch feed data from backend
export const fetchFeedData = createAsyncThunk(
  "feed/fetchFeedData",
  async ({ query = "", pageNumber = 1, maxPage = 2 }) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/get-feed-data`,
      { query, pageNumber, maxPage }
    );
    return res.data;
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFeedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default feedSlice.reducer;
