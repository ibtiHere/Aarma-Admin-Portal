/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const LoginUserApi = createAsyncThunk(
  "loginuser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/admin-login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      toast.success(response?.data?.message);
      localStorage.setItem("Token", response?.data?.token);
      localStorage.setItem("AdminData", JSON.stringify(response?.data?.userExist));

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
        console.log("Error", error);
      }
      // Use rejectWithValue to propagate the error to the rejected action
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  userLoginDetail: {},
};
const LoginUserSlicer = createSlice({
  name: "loginuser",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(LoginUserApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUserApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userLoginDetail = action.payload;
      console.log(action.payload)
      window.location.reload();
    });
    builder.addCase(LoginUserApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default LoginUserSlicer.reducer;
