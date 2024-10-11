import axios from "axios"; // Ensure you have axios installed
import { useEffect, useState } from "react";
import {
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardBody,
  Switch,
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader";
import BookingActionModal from "../component/BookingActionModal";
import BookingDetailsModal from "../component/eventManagerModal"; // Import your new modal component
import { DeleteBookingApi } from "../features/slicer/DeleteBookingSlicer";
import EventManagerReasonModal from "../component/EventManagerReasonModal";
import { toast } from "react-toastify"; // Make sure to import toast for notifications
import { getUsersApi } from "../features/slicer/UsersSlicer"; // Assuming you have this for refreshing user list
import { baseUrl, config } from "../features/slicer/Slicer";
import BookingDetailModal from "../component/eventManagerModal";

const Bookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState(null);
  const dispatch = useDispatch();
  const { AllBookings, isLoading: Loading } = useSelector(
    (state) => state.BookingSlicer
  );
  console.log("sadsa", AllBookings);

  const { isLoading: isRespondLoading } = useSelector(
    (state) => state.RespondBookingSlicer
  );

  const [bookingId, setBookingId] = useState("");
  const [bookingModal, setBookingModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // To store selected booking details

  const handleChangeBookingStatus = (bookingId) => {
    setBookingId(bookingId);
    setBookingModal(true);
  };

  const handleDeleteBooking = (Id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (confirm) {
      dispatch(DeleteBookingApi(Id));
    }
  };

  const handleRejectEventManager = async (profileId) => {
    try {
      await axios.post(
        `${baseUrl}/event-managers/reject-profile`, // Your API endpoint for rejection
        { profileId, reason }, // Change this to match the required format
        config
      );
      toast.success("Event Manager Rejected Successfully"); // Success toast
      window.location.reload(); // Refresh the page or update the state as needed
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage); // Error toast
    }
  };

  // New function to approve the event manager
  const approveEventManager = async (profileId) => {
    try {
      await axios.post(
        `${baseUrl}/event-managers/approve-profile`, // Your API endpoint for approval
        { profileId }, // Change this to match the required format
        config
      );
      toast.success("Event Manager Approved Successfully"); // Success toast
      window.location.reload(); // Refresh the page or update the state as needed
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage); // Error toast
    }
  };
  // Block/Unblock toggle karne ka function
  const handleToggleBlock = (Id, profile_staus) => {
    console.log(`Toggling block for ID: ${Id}, Status: ${profile_staus}`);
    if (profile_staus === "Restricted") {
      console.log("Unblocking user...");
      unblockUser(Id);
    } else {
      console.log("Opening modal for blocking reason...");
      setUserIdToBlock(Id);
      setIsModalOpen(true);
    }
  };

  // User ko unblock karne ka function
  const unblockUser = async (Id) => {
    try {
      await axios.post(
        `${baseUrl}/event-managers/unrestrict-eventmanager`, // Fixing string interpolation
        { profileId: Id },
        config
      );
      toast.success("User Unblocked Successfully"); // Success toast
      window.location.reload();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      toast.error(errorMessage); // Error toast
    }
  };

  const handleCloseModal = () => {
    setBookingModal(false);
  };

  const handleOpenDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModal(false);
    setSelectedBooking(null); // Clear the selected booking when closing
  };

  // Render booking rows based on the status
  const renderBookings = (bookings) => {
    return bookings.map((booking) => (
      <tr key={booking._id}>
        <td className="border px-4 py-2">{booking.fullname}</td>
        <td className="border px-4 py-2">{booking.email}</td>
        <td className="border px-4 py-2">{booking.phone}</td>
        <td className="border px-4 py-2">
          <Chip color="gray" value={booking.profile_staus} />
        </td>
        <td className="border px-4 py-2 flex justify-center gap-10 items-center">
          <Tooltip content="Restrict/UnRestricts">
            <Switch
              checked={booking?.profile_staus === "Restricted"} // Check if user is restricted
              onChange={
                () => handleToggleBlock(booking?._id, booking?.profile_staus) // Handle toggle action
              }
              color="red"
            />
          </Tooltip>

          <Tooltip content="View Details">
            <IconButton
              color="blue"
              onClick={() => handleOpenDetailsModal(booking)}
            >
              <EyeIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Delete Booking">
            <IconButton
              color="red"
              onClick={() => handleDeleteBooking(booking._id)}
            >
              <TrashIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip content="Approve Event Manager">
            <IconButton
              color="green"
              onClick={() => approveEventManager(booking._id)}
            >
              <CheckIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip>
          <Tooltip content="Reject Event Manager">
            <IconButton
              color="red"
              onClick={() => handleRejectEventManager(booking._id)}
            >
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          </Tooltip> */}
        </td>
      </tr>
    ));
  };

  // Combine all bookings into a single array
  const getAllBookings = () => {
    return AllBookings ? Object.values(AllBookings).flat() : []; // Return an empty array if AllBookings is undefined
  };

  return (
    <div>
      {Loading || isRespondLoading ? (
        <Loader />
      ) : (
        <Card className="h-full pt-10 md:pt-0 w-full mb-10">
          <CardBody className="h-[70vh] overflow-auto px-0">
            <Tabs value="all" className="w-full p-4">
              <TabsHeader>
                <Tab value="all">All</Tab>
                <Tab value="draft">Draft</Tab>
                <Tab value="inreview">In Review</Tab>
                <Tab value="active">Active</Tab>
                <Tab value="rejected">Rejected</Tab>
                <Tab value="restricted">Restricted</Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value="all">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{renderBookings(getAllBookings())}</tbody>
                  </table>
                </TabPanel>
                <TabPanel value="draft">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{renderBookings(AllBookings["draft"] || [])}</tbody>
                  </table>
                </TabPanel>
                <TabPanel value="inreview">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderBookings(AllBookings["inreview"] || [])}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="active">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{renderBookings(AllBookings["active"] || [])}</tbody>
                  </table>
                </TabPanel>
                <TabPanel value="rejected">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderBookings(AllBookings["rejected"] || [])}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel value="restricted">
                  <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderBookings(AllBookings["restricted"] || [])}
                    </tbody>
                  </table>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
      )}

      <BookingActionModal
        open={bookingModal}
        handleClose={handleCloseModal}
        bookingId={bookingId}
      />
      <BookingDetailModal
        open={detailsModal}
        handleClose={handleCloseDetailsModal}
        booking={selectedBooking}
      />
      <EventManagerReasonModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userId={userIdToBlock}
      />
    </div>
  );
};

export default Bookings;
