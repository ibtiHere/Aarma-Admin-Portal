import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";


export const getBookingsApi = createAsyncThunk(
  "adminPanel/getBookings",
  async () => {
    return await axios
      .get(`${baseUrl}/event-managers/event-managers`, config)
      .then((resp) => {
        console.log(resp?.data)

        console.log("wsada")
        return resp.data.data;
      })
      .catch((err) => {
        return err.message
      });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  AllBookings: '',
};

const BookingSlicer = createSlice({
  name: 'Bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookingsApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBookingsApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.AllBookings = action.payload;
    });
    builder.addCase(getBookingsApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }
})




export default BookingSlicer.reducer;

