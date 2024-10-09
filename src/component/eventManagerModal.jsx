import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Tabs,
  Tab,
} from "@material-tailwind/react";
import { baseUrl } from "../features/slicer/Slicer";

const BookingDetailModal = ({
  open,
  setIsOpen,
  handleClose,
  booking,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState(0); // State for active tab

  const profileUrl = "http://139.84.209.189:3002/";

  if (!booking) return null;
  const closeModal = () => {
    // setIsOpen(false);
    handleClose();
  };

  return (
    <Dialog open={open} handler={closeModal}>
      <DialogHeader>
        <div className="flex items-center">
          <img
            src={profileUrl + booking.profile}
            alt="User"
            className="rounded-full w-16 h-16 mr-4"
          />
          <div>
            <Typography variant="h6">{booking.fullname}</Typography>
            <Typography variant="body2">
              Status: {booking.profile_status}
            </Typography>
          </div>
        </div>
      </DialogHeader>
      <DialogBody>
        {loading ? ( // Show loading state if loading
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col items-center">
            <Typography>Email: {booking.email}</Typography>
            <Typography>Phone: {booking.phone}</Typography>
            <Typography>{booking.tagline}</Typography>

            {/* Buttons for Portfolio and Verification Documents */}
            <div className="flex mt-4">
              <button
                onClick={() => setActiveTab(0)} // Set active tab to Portfolio
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-l ${
                  activeTab === 0 ? "bg-blue-700" : ""
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab(1)} // Set active tab to Verification Documents
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-r ${
                  activeTab === 1 ? "bg-blue-700" : ""
                }`}
              >
                Verification Documents
              </button>
            </div>

            {/* Tabs for Portfolio and Verification Documents */}
            {activeTab === 0 && (
              <>
                <Typography className="mt-4 text-lg font-bold">
                  Portfolio:
                </Typography>
                <div className="flex flex-wrap justify-center mt-2">
                  {booking.portfolio.length > 0 ? (
                    booking.portfolio.map((item, index) => (
                      <img
                        key={index} // Add key for each mapped item
                        src={profileUrl + item.photos[0]} // Accessing the first photo in the portfolio
                        alt="Portfolio"
                        className="w-32 h-32 mb-4 mx-2" // Added margin for spacing
                      />
                    ))
                  ) : (
                    <div>No portfolio available</div>
                  )}
                </div>
              </>
            )}

            {activeTab === 1 && (
              <>
                <Typography className="mt-4 text-lg font-bold">
                  Verification Documents:
                </Typography>
                <div className="flex flex-wrap justify-center mt-2">
                  {booking.id_card && (
                    <img
                      src={profileUrl + booking.id_card}
                      alt="ID Card"
                      className="w-32 h-32 mb-4 mx-2"
                    />
                  )}
                  {booking.verif_document && (
                    <img
                      src={profileUrl + booking.verif_document}
                      alt="Verification Document"
                      className="w-32 h-32 mb-4 mx-2"
                    />
                  )}
                </div>
              </>
            )}

            {/* Close Modal Button */}
            <button
              onClick={closeModal} // Close the modal when the button is clicked
              className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        )}
      </DialogBody>
    </Dialog>
  );
};

export default BookingDetailModal;
