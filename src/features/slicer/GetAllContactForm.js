import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  { baseUrl ,config } from "./Slicer";


export const getContactApi = createAsyncThunk(
    "adminPanel/getUsers",
    async () => {
      return await axios
        .get(`${baseUrl}users/get-all-contactsus`)
        .then((resp) => {
          return resp.data.contacts;
        })
        .catch((err) => {
            return err.message
        });
    }
  );
 
  const initialState = {
    isLoading: false,
    isError: false,
    ContactForms: '',
  };

  const GetAllContactForm = createSlice({
    name: 'ContactForms',
    initialState,
    reducers :{ },
    extraReducers : (builder)=>{
        builder.addCase(getContactApi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getContactApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ContactForms = action.payload;
        });
        builder.addCase(getContactApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        
    }
  })




  export default GetAllContactForm.reducer;

