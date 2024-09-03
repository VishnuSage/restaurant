import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurant = createAsyncThunk(
  "restaurantSlice/fetchRestaurant",
  () => {
    const result = axios("/restaurant.json").then((response) => response.data);
    console.log("Response from thunk");
    console.log(result);
    return result;
  }
);

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState: {
    loading: false,
    allRestaurant: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurant.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.allRestaurant = action.payload;
      state.searchRestaurant = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRestaurant.rejected, (state, action) => {
      state.loading = false;
      state.allRestaurant = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    searchRestaurant: (state, action) => {
      state.allRestaurant.restaurants =
        state.searchRestaurant?.restaurants.filter((item) =>
          item.neighborhood.toLowerCase().includes(action.payload)
        );
    },
  },
});

export default restaurantSlice.reducer;
export const { searchRestaurant } = restaurantSlice.actions;
