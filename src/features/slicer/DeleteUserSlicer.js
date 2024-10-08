import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { getUsersApi } from "./UsersSlicer";
import { data } from "autoprefixer";

export const DeleteUserApi = createAsyncThunk(
  "adminPanel/deleteuser",
  async (Id, { dispatch }) => {
    return await axios
      .post(`${baseUrl}/users/remove-client`, { clientId: Id }, config)  // Send clientId in the request body
      .then((resp) => {
        toast.success("User Deleted Successfully");
        dispatch(getUsersApi());  // Refresh users list after deletion
        return resp.data;
      })
      .catch((err) => {
        toast.error("Error deleting user");
        return err.message;
      });
  }
);


const initialState = {
  isLoading: false,
  isError: false,
};

const DeleteUserSlicer = createSlice({
  name: "deleteuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /// for delete user
    builder.addCase(DeleteUserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteUserApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DeleteUserApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default DeleteUserSlicer.reducer;
