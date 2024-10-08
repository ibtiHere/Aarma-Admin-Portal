import { Modal, Typography, Button } from "@material-tailwind/react";

const BookingDetailsModal = ({ open, onClose, booking }) => {
  if (!booking) return null;
  console.log(booking);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-4">
        <Typography variant="h6" className="mb-4">
          Booking Details
        </Typography>
        <Typography>Name: {booking.fullname}</Typography>
        <Typography>Email: {booking.email}</Typography>
        <Typography>Phone: {booking.phone}</Typography>
        <Typography>Status: {booking.profile_staus}</Typography>

        <Button onClick={onClose} color="blue" className="mt-4">
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;
