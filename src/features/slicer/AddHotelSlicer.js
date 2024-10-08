import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getHotelApi } from "./HotelSlicer";

export const AddHotelApi = createAsyncThunk(
  "addhotel",
  async (formData, { rejectWithValue ,dispatch }) => {
    try {
      const response = await axios.post(
        `${baseUrl}bookings/create-place`,formData,config);
      console.log(response);
      toast.success(response?.data?.message);
      dispatch(getHotelApi())
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
const AddHotelSlicer = createSlice({
  name: "addhotel",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(AddHotelApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddHotelApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddHotelApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default AddHotelSlicer.reducer;
