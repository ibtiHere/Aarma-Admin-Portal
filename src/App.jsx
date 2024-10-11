import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MiniDrawer from "./component/MiniDrawer";
import Login from "./Screens/Login";
import { getUsersApi } from "./features/slicer/UsersSlicer";
import { getBookingsApi } from "./features/slicer/EventManagerSlicer";
import { getHotelApi } from "./features/slicer/HotelSlicer";
import { getContactApi } from "./features/slicer/GetAllContactForm";
import Test from "./Screens/test";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  const Token = localStorage.getItem("Token");
  const userData = localStorage.getItem("AdminData");
  const userdataObj = userData && JSON.parse(userData || {});

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUsersApi());
    dispatch(getBookingsApi());
    // dispatch(getHotelApi());
    // dispatch(getContactApi());
  }, []);
  return (
    <>
      <Router>
        {Token ? (
          <MiniDrawer />
        ) : (
          // <Routes>
          //   <Route path="*" element={<Test />} />
          // </Routes>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
