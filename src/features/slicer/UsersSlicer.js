import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";


export const getUsersApi = createAsyncThunk(
  "adminPanel/getUsers",
  async () => {
    return await axios
      .get(`${baseUrl}/users/clients`, config)
      .then((resp) => {
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
  Users: '',
};

const UsersSlicer = createSlice({
  name: 'Users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Users = action.payload;
    });
    builder.addCase(getUsersApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

  }
})




export default UsersSlicer.reducer;

