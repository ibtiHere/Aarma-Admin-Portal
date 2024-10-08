import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { baseUrl } from "../features/slicer/Slicer";

const BookingDetailModal = ({ open, onClose, booking, loading }) => {
  const [portfolioOpen, setPortfolioOpen] = useState(false); // State for portfolio modal

  const handlePortfolioOpen = () => {
    setPortfolioOpen(true);
  };

  const handlePortfolioClose = () => {
    setPortfolioOpen(false);
  };

  if (!booking) return null;

  return (
    <>
      <Dialog open={open} handler={onClose}>
        <DialogHeader>{booking.fullname}</DialogHeader>
        <DialogBody>
          {loading ? ( // Show loading state if loading
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={baseUrl + booking.profile}
                alt="User"
                className="rounded-full w-32 h-32 mb-4"
              />
              <Typography>Name: {booking.fullname}</Typography>
              <Typography>Email: {booking.email}</Typography>
              <Typography>Phone: {booking.phone}</Typography>
              <Typography>{booking.tagline}</Typography>
              <Typography>Status: {booking.profile_staus}</Typography>
              <div>portfolio</div>
              {/* map portfolio
              
              */}

              {booking.portfolio.length > 0 ? (
                <div>
                  {booking.portfolio.map((item) => (
                    <img
                      src={baseUrl + item}
                      alt="Portfolio"
                      className="w-32 h-32 mb-4"
                    />
                  ))}
                </div>
              ) : (
                <div>No portfolio</div>
              )}
            </div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BookingDetailModal;
