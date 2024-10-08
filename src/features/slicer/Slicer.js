import { createSlice } from "@reduxjs/toolkit";

export const baseUrl = "http://localhost:3002";
const token = localStorage.getItem("Token");

export const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const initialState = {
  isLoading: false,
  isError: false,
  isModalOpen: false,
  isMainCatModal: false,
  isSubCatModal: false,
  isCustomerActionModalOpen: false,
  isEmployeeActionModalOpen: false,
};

const Slicer = createSlice({
  name: "slicer",
  initialState,
  reducers: {},
});

// export const {} = Slicer.actions;
export default Slicer.reducer;
