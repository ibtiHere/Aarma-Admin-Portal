import { useEffect, useState } from "react";
import axios from "axios"; // Ensure you have axios installed
import { baseUrl, config } from "../features/slicer/Slicer";
import { useDispatch } from "react-redux";
import { getUsersApi } from "../features/slicer/UsersSlicer";

const BlockReasonModal = ({ isModalOpen, setIsModalOpen, userId }) => {
  const [blockReason, setBlockReason] = useState("");

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

  const handleBlockUser = async () => {
    if (!userId || !blockReason) {
      alert("User ID and block reason are required!");
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/users/block-client`,
        {
          clientId: userId, // Update this to match the API requirement
          reason: blockReason,
        },
        config
      );
      console.log(response.data);
      dispatch(getUsersApi()); // Handle the response as needed
      closeModal(); // Close modal after blocking
    } catch (error) {
      console.error("Error blocking user:", error);
      // Handle error appropriately (show a notification, etc.)
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
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)} // Update state on change
                className="bg-gray-100 w-full h-20 outline-none"
                placeholder="Enter reason here..." // Placeholder added for better UX
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
                onClick={handleBlockUser} // Call handleBlockUser when confirming
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

export default BlockReasonModal;
