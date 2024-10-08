import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getBookingsApi } from "./EventManagerSlicer";

// Async thunk for deleting a booking
export const DeleteBookingApi = createAsyncThunk(
  "adminPanel/deleteBooking",
  async (Id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/event-managers/remove-eventmanager`,
        { profileId: Id }, // Request body
        config
      );
      toast.success("Booking Deleted Successfully");
      dispatch(getBookingsApi()); // Refresh bookings after deletion
      return response.data; // Return the data to the fulfilled case
    } catch (error) {
      // Handle error case
      toast.error(error.response?.data?.message || "Error deleting booking");
      return rejectWithValue(error.message); // Use rejectWithValue for error handling
    }
  }
);

// Initial state for the slice
const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: "", // Optional: to store the error message
};

// Create the slice
const DeleteBookingSlicer = createSlice({
  name: "deleteBooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state
    builder.addCase(DeleteBookingApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false; // Reset error state
      state.errorMessage = ""; // Reset error message
    });

    // Handle fulfilled state
    builder.addCase(DeleteBookingApi.fulfilled, (state) => {
      state.isLoading = false; // Stop loading
    });

    // Handle rejected state
    builder.addCase(DeleteBookingApi.rejected, (state, action) => {
      state.isLoading = false; // Stop loading
      state.isError = true; // Set error state
      state.errorMessage = action.payload || "Failed to delete booking"; // Capture error message
    });
  },
});

// Export the reducer
export default DeleteBookingSlicer.reducer;
