import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";

const RejectionReasonModal = ({ open, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onSubmit(reason);
    onClose();
    setReason(""); // Clear the input after submission
  };

  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogHeader>
        <Typography variant="h6">Rejection Reason</Typography>
      </DialogHeader>
      <DialogBody>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for rejection"
          className="w-full h-32 p-2 border rounded-md"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default RejectionReasonModal;
