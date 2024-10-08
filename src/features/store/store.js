import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";
import BookingSlicer from "../slicer/EventManagerSlicer";
import UsersSlicer from "../slicer/UsersSlicer";
import LoginUserSlicer from "../slicer/LoginUserSlicer";
import RespondBookingSlicer from "../slicer/RespondBookingSlicer";
import HotelSlicer from "../slicer/HotelSlicer";
import DeleteHotelSlicer from "../slicer/DeleteHotelSlicer";
import AddHotelSlicer from "../slicer/AddHotelSlicer";
import GetAllContactForm from "../slicer/GetAllContactForm";

export const store = configureStore({
  reducer: {
    Slicer,
    UsersSlicer,
    BookingSlicer,
    LoginUserSlicer,
    RespondBookingSlicer,
    HotelSlicer,
    DeleteHotelSlicer, AddHotelSlicer, GetAllContactForm

  },
});
