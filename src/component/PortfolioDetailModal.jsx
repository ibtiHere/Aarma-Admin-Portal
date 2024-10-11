import React from "react";
import PortfolioCarousel from "./PortfolioCarousel"; // Adjust the path accordingly
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import { FaRegCircleXmark } from "react-icons/fa6";

const PortfolioDetailModal = ({ open, onClose, portfolioItem }) => {
  if (!portfolioItem) return null;

  const profileUrl = "http://139.84.209.189:3002/";

  return (
    <Dialog
      open={open}
      handler={onClose}
      size="lg"
      className="h-[90vh] overflow-y-scroll"
    >
      <DialogHeader className="flex justify-between items-center">
        <Typography variant="h6" className="font-bold text-black text-2xl">
          Portfolio Details:
        </Typography>
        <FaRegCircleXmark
          onClick={onClose}
          className="h-6 w-6 text-gray-500 cursor-pointer absolute top-4 right-4"
          aria-label="Close"
        />
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col ">
          <Typography className="text-lg font-bold text-black mb-4">
            {portfolioItem.title}
          </Typography>
          <PortfolioCarousel
            className="" // Ensure the carousel takes full width
            photos={portfolioItem.photos}
            profileUrl={profileUrl}
          />
          <Typography className="mt-4">{portfolioItem.description}</Typography>
          <Typography className="mt-4 font-bold text-xl text-black ">
            Total Guests: {portfolioItem.total_guests}
          </Typography>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PortfolioDetailModal;
