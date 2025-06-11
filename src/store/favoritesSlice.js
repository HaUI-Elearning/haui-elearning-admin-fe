import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavoriteItems = createAsyncThunk(
  "favorites/fetchFavoriteItems",
  async (accessToken) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/favorite-courses",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      localStorage.setItem("favoriteItems", JSON.stringify([]));
      throw error;
    }
  }
);

export const addToFavoritesApi = createAsyncThunk(
  "favorites/addToFavoritesApi",
  async ({ courseId, accessToken }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/favorite-courses?courseId=${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      throw error;
    }
  }
);

export const removeFromFavoritesApi = createAsyncThunk(
  "favorites/removeFromFavoritesApi",
  async ({ courseId, accessToken }) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/favorite-courses?courseId=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      throw error;
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: JSON.parse(localStorage.getItem("favoriteItems")) || [],
    status: "idle",
  },
  reducers: {
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem("favoriteItems");
    },
    updateFavoriteItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("favoriteItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteItems.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("favoriteItems", JSON.stringify(state.items));
        state.status = "succeeded";
      })
      .addCase(fetchFavoriteItems.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToFavoritesApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToFavoritesApi.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("favoriteItems", JSON.stringify(state.items));
        state.status = "succeeded";
      })
      .addCase(addToFavoritesApi.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(removeFromFavoritesApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromFavoritesApi.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem("favoriteItems", JSON.stringify(state.items));
        state.status = "succeeded";
      })
      .addCase(removeFromFavoritesApi.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { clearFavorites, updateFavoriteItems } = favoriteSlice.actions;
export default favoriteSlice.reducer;
