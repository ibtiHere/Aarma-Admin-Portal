import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import PortfolioDetailModal from "./PortfolioDetailModal"; // Assuming the path is correct
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegCircleXmark } from "react-icons/fa6";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config } from "../features/slicer/Slicer";
import RejectionReasonModal from "./RejectionReasonModal";

const BookingDetailModal = ({ open, handleClose, booking, loading }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);

  const profileUrl = "http://139.84.209.189:3002/";
  const approveEventManager = async (profileId) => {
    try {
      await axios.post(
        `${baseUrl}/event-managers/approve-profile`, // Your API endpoint for approval
        { profileId }, // Change this to match the required format
        config
      );
      toast.success("Event Manager Approved Successfully"); // Success toast
      // close modal
      handleClose();
      // Delay for 5 seconds (5000 milliseconds) before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage); // Error toast
    }
  };

  const handleRejectEventManager = async (profileId, reason) => {
    try {
      await axios.post(
        `${baseUrl}/event-managers/reject-profile`, // Your API endpoint for rejection
        { profileId, reason }, // Change this to match the required format
        config
      );
      toast.success("Event Manager Rejected Successfully"); // Success toast
      // close modal
      handleClose();
      // Delay for 5 seconds (5000 milliseconds) before reloading the page
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage); // Error toast
    }
  };

  const handlePortfolioClick = (item) => {
    setSelectedPortfolio(item); // Set selected portfolio item
    setPortfolioModalOpen(true); // Open portfolio modal
  };
  const handleRejectButtonClick = () => {
    setRejectionModalOpen(true); // Open rejection reason modal
  };
  const handleRejectionSubmit = async (reason) => {
    await handleRejectEventManager(booking._id, reason); // Call rejection handler with reason
  };

  if (!booking) return null;

  return (
    <Dialog
      open={open}
      handler={handleClose}
      size="lg"
      className="h-[90vh] overflow-y-scroll"
    >
      <DialogHeader>
        <div className="flex items-center w-full gap-4 p-4">
          <img
            src={profileUrl + booking.profile}
            alt="User"
            className="rounded-full w-20 h-20 ml-4"
          />
          <div>
            <Typography variant="h6" className="text-2xl">
              {booking.fullname}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-500 flex items-center space-x-2"
            >
              <span className="font-bold">{booking.profile_staus}</span>
              <MdEmail className="h-5 w-5" />
              <span>{booking.email}</span>
              <FaPhoneAlt />
              <span>{booking.phone}</span>
            </Typography>
            <Typography className="text-black font-bold">
              {booking.tagline}
            </Typography>
          </div>
        </div>
        <FaRegCircleXmark
          className="h-6 w-6 text-gray-500 cursor-pointer absolute top-4 right-4"
          onClick={handleClose}
        />
      </DialogHeader>
      <DialogBody>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex justify-center w-full mt-4 p-4 bg-[#ededed] rounded-[10px]">
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center h-[2vh] items-center">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`border-2 py-2 px-4 rounded-md font-semibold transition-colors duration-300 w-full sm:w-[48%] lg:w-[45%] h-[8vh] ${
                    activeTab === 0
                      ? "bg-[#FF725E] text-white border-[#FF725E]"
                      : "bg-white text-black border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  Portfolio
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`border-2 py-2 px-4 rounded-md font-semibold transition-colors duration-300 w-full sm:w-[48%] lg:w-[45%] h-[8vh] ${
                    activeTab === 1
                      ? "bg-[#FF725E] text-white border-[#FF725E]"
                      : "bg-white text-black border-gray-300 hover:bg-blue-50"
                  }`}
                >
                  Verification Documents
                </button>
              </div>
            </div>

            <div className="mt-6 w-full">
              {activeTab === 0 && (
                <div className="flex py-3 px-2   items-center h-fit    overflow-x-auto  w-full gap-4">
                  {booking.portfolio.length > 0 ? (
                    booking.portfolio.map((item, index) => (
                      <div
                        className="w-[254px] relative  "
                        onClick={() => handlePortfolioClick(item)}
                      >
                        {/* Overlay Div */}

                        {/* Portfolio Image */}
                        <img
                          key={index}
                          src={profileUrl + item.photos[0]}
                          alt="Portfolio"
                          className="w-full h-[254px] object-cover  rounded-md  duration-300 cursor-pointer shadow-md  hover:scale-110"
                        />
                      </div>

                      // <div

                      //   className="border rounded-lg hover:shadow-lg hover:shadow-onSecondary w-full h-80 md:h-96  relative group overflow-hidden"
                      // >
                      //   <img
                      //      key={index}
                      //     onClick={() => handlePortfolioClick(item)}
                      //     src={profileUrl + item.photos[0]} // Replace with the actual image URL
                      //     alt="Your Image Alt Text"
                      //     className="w-full h-full transition-transform duration-1000 object-cover  ease-in-out transform group-hover:scale-110 group-hover:opacity-30"
                      //   />

                      //   <div className="absolute  top-0 left-0 right-0 h-full  flex items-center justify-center   flex-col  text-black p-2 opacity-0 group-hover:opacity-100 transition-opacity transform ease-in-out duration-1000">
                      //     <div className="flex flex-col items-center justify-center text-center gap-3">
                      //       <h2 className="text-onPrimary text-2xl font-900  uppercase ">
                      //         {item.title}
                      //       </h2>
                      //       <p className="text-primary font-700 capitalize">
                      //         {item.description}
                      //       </p>
                      //     </div>
                      //     <div className="flex gap-2 py-3">
                      //       <span className="bg-onPrimary  flex justify-center items-center cursor-pointer text-secondary rounded-full w-8 h-8">
                      //         <i className="fa-solid fa-plus"></i>
                      //       </span>
                      //       <span className="bg-onPrimary  flex justify-center items-center cursor-pointer text-secondary rounded-full w-8 h-8">
                      //         <i className="fa-solid fa-link"></i>
                      //       </span>
                      //     </div>
                      //   </div>
                      // </div>
                    ))
                  ) : (
                    <div>No portfolio available</div>
                  )}
                </div>
              )}

              {activeTab === 1 && (
                <div className="flex flex-wrap overflow-x-auto items-center mt-2 w-full gap-4">
                  {booking.id_card && (
                    <img
                      src={profileUrl + booking.id_card}
                      alt="ID Card"
                      className="w-32 h-32 mb-4 rounded-md shadow-md w-[254px] h-[254px]"
                    />
                  )}
                  {booking.verif_document && (
                    <img
                      src={profileUrl + booking.verif_document}
                      alt="Verification Document"
                      className="w-32 h-32 mb-4 rounded-md shadow-md w-[254px] h-[254px]"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center w-full mt-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => approveEventManager(booking._id)}
              className="border-2 py-2 px-6 rounded-md font-semibold transition-colors duration-300 w-[45%] h-[8vh] bg-[#FF725E] text-white border-[#FF725E] flex items-center justify-center gap-2 hover:bg-[#e85d4c] hover:border-[#e85d4c]"
            >
              <CheckIcon className="h-5 w-5" />
              Accept
            </button>
            <button
              onClick={handleRejectButtonClick} // Open the rejection reason modal
              className="border-2 py-2 px-6 rounded-md font-semibold transition-colors hover:text-white transition-colors duration-300 w-[45%] h-[8vh] bg-white text-black border-[#FF725E] flex items-center justify-center gap-2 hover:bg-[#e85d4c] hover:border-[#e85d4c]"
            >
              <XMarkIcon className="h-5 w-5" />
              Reject
            </button>
          </div>
        </div>
      </DialogBody>

      {/* Render PortfolioDetailModal only if portfolioModalOpen is true */}
      {portfolioModalOpen && (
        <PortfolioDetailModal
          open={portfolioModalOpen}
          onClose={() => setPortfolioModalOpen(false)}
          portfolioItem={selectedPortfolio}
        />
      )}
      {/* Render RejectionReasonModal only if rejectionModalOpen is true */}
      {rejectionModalOpen && (
        <RejectionReasonModal
          open={rejectionModalOpen}
          onClose={() => setRejectionModalOpen(false)}
          onSubmit={handleRejectionSubmit}
        />
      )}
    </Dialog>
  );
};

export default BookingDetailModal;
