import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config } from "../features/slicer/Slicer";
import { getBookingsApi } from "../features/slicer/EventManagerSlicer";

const EventManagerReasonModal = ({ isModalOpen, setIsModalOpen, userId }) => {
  const [reason, setReason] = useState(""); // Correct state variable for reason

  const dispatch = useDispatch();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleConfirm = async () => {
    if (!reason) {
      toast.error("Reason is required");
      return;
    }

    try {
      await axios.post(
        `${baseUrl}/event-managers/restrict-eventmanager`,
        {
          profileId: userId,
          reason,
        },
        config
      );
      toast.success("User Blocked Successfully");

      setIsModalOpen(false);

      console.log(profileId, reason);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 bg-black flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking on background
        >
          <div
            className="border-2 bg-white rounded-lg shadow-xl max-w-lg w-full p-6 transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal
          >
            <h1 className="text-2xl font-bold text-gray-900">Block User</h1>
            <div>
              <textarea
                value={reason} // Use the correct state variable
                onChange={(e) => setReason(e.target.value)} // Update state on change
                className="bg-gray-100 w-full h-20 outline-none"
                placeholder="Enter reason here..." // Placeholder for better UX
              />
            </div>
            <div className="flex justify-end w-full gap-2 mt-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
              <button
                onClick={handleConfirm} // Call handleConfirm when confirming
                className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagerReasonModal;
