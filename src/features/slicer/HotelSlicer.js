import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  { baseUrl ,config } from "./Slicer";


export const getHotelApi = createAsyncThunk(
    "adminPanel/hotel",
    async () => {
      return await axios
        .get(`${baseUrl}bookings/get-all-places`,config)
        .then((resp) => {
            console.log(resp?.data)
          return resp.data?.places;
        })
        .catch((err) => {
            return err.message
        });
    }
  );
 
  const initialState = {
    isLoading: false,
    isError: false,
    AllHotels: '',
  };

  const HotelSlicer = createSlice({
    name: 'hotel',
    initialState,
    reducers :{ },
    extraReducers : (builder)=>{
        builder.addCase(getHotelApi.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getHotelApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.AllHotels = action.payload;
        });
        builder.addCase(getHotelApi.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
        
    }
  })




  export default HotelSlicer.reducer;

