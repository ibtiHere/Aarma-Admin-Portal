import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getBookingsApi } from "./EventManagerSlicer";
import { getHotelApi } from "./HotelSlicer";

export const deleteHotelApi = createAsyncThunk(
  "adminPanel/deletehotel",
  async (Id, { dispatch }) => {
    return await axios
      .delete(`${baseUrl}bookings/delete-place/${Id}`, config)
      .then((resp) => {
        toast.success("Hotel Deleted Successfully");
        dispatch(getHotelApi());
        return resp.data;
      })
      .catch((err) => {
        toast.error(err);
        return err.message;
      });
  }
);
const initialState = {
  isLoading: false,
  isError: false,
};

const DeleteHotelSlicer = createSlice({
  name: "deletehotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /// for delete user
    builder.addCase(deleteHotelApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteHotelApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteHotelApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default DeleteHotelSlicer.reducer;
