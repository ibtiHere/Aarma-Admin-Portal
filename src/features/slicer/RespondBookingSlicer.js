/* eslint-disable @typescript-eslint/no-explici*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getBookingsApi } from "./EventManagerSlicer";

export const RespondBookingApi = createAsyncThunk(
  "bookingaction",
  async (RespondBooking, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${baseUrl}bookings/respond-to-booking-request`, RespondBooking, config);
      console.log(response);
      toast.success(response?.data?.message);
      dispatch(getBookingsApi())
      return response?.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        toast.error(error.response?.data?.message);
      } else if (error.request) {
        toast.error("No response received from the server");
        console.log(error.request);
      } else {
        toast.error("An error occurred while processing your request");
        console.log("Error", error.message);
      }
      // Use rejectWithValue to propagate the error to the rejected action
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};
const RespondBookingSlicer = createSlice({
  name: "bookingaction",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(RespondBookingApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RespondBookingApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(RespondBookingApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default RespondBookingSlicer.reducer;
