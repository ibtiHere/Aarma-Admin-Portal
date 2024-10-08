import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../component/Loader";
import { deleteHotelApi } from "../features/slicer/DeleteHotelSlicer";
import AddHotelModal from "../component/AddHotelModal";

const Hotel = () => {
  const dispatch = useDispatch();
  const { AllHotels, isLoading } = useSelector((state) => state.HotelSlicer);
  const [modalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const TABLE_HEAD = [
    "Sr.No",
    "Image",
    "Hotel Name",
    "address",
    "Price per Night",
    "Description",
    "Action",
  ];

  return (
    <>
      <Card className="h-full  pt-10 md:pt-0  w-full mb-10">
        <CardBody className="     h-screen  overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto  text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AllHotels.length > 0 ? (
                AllHotels?.map((item, index) => {
                  const isLast = index === AllHotels?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <img
                          src={"http://localhost:7000/" + item?.images[0]}
                          className=" h-12 w-12 object-cover"
                        />
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.placeTitle}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.address.length > 50
                            ? item?.address.slice(0, 50) + "..."
                            : item?.address}
                        </Typography>
                        <p>location: {item?.location}</p>
                        <p>City: {item?.city}</p>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.pricePerNight}.Rs
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item?.description.length > 50
                            ? item?.description.slice(0, 50) + "..."
                            : item?.description}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete user ">
                          <IconButton
                            onClick={() => {
                              dispatch(deleteHotelApi(item?._id));
                            }}
                            variant="text"
                          >
                            <TrashIcon className="text-red-700 h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p className="absolute top-0 w-full left-0 h-screen flex justify-center items-center font-bold text-2xl ">
                  {" "}
                  NO DATA...
                </p>
              )}
            </tbody>
          </table>
        </CardBody>
        <div className="absolute bottom-10 right-10">
          <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
            onClick={handleOpenModal}
            className="w-36 rounded-full"
          >
            Add Hotel
          </Button>
        </div>
      </Card>
      <AddHotelModal modalOpen={modalOpen} handleClose={handleCloseModal} />
      {isLoading && <Loader />}
    </>
  );
};

export default Hotel;
