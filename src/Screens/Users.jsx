import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  CardBody,
  Switch,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../component/Loader";
import { DeleteUserApi } from "../features/slicer/DeleteUserSlicer";
import { getUsersApi } from "../features/slicer/UsersSlicer";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config } from "../features/slicer/Slicer";
import BlockReasonModal from "../component/BlockReasonModal";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToBlock, setUserIdToBlock] = useState(null);

  const dispatch = useDispatch();
  const { Users, isLoading } = useSelector((state) => state.UsersSlicer);

  const TABLE_HEAD = [
    "Sr.No",
    "Full Name",
    "Phone Number",
    "Email",
    "Block/Unblock",
    "Action",
  ];

  // User ko delete karne ka function
  const handleDeleteUser = (Id) => {
    if (
      window.confirm("Kya aap sach mein is user ko delete karna chahte hain?")
    ) {
      dispatch(DeleteUserApi(Id));
    }
  };

  // Block/Unblock toggle karne ka function
  const handleToggleBlock = (Id, isBlocked) => {
    if (isBlocked) {
      // Agar blocked hai, to unblock karo
      unblockUser(Id);
    } else {
      // Modal open karo blocking reason ke liye
      setUserIdToBlock(Id);
      setIsModalOpen(true);
    }
  };

  // User ko unblock karne ka function
  const unblockUser = async (Id) => {
    try {
      await axios.post(
        `${baseUrl}/users/unblock-client`,
        { clientId: Id },
        config
      );
      toast.success("User Unblocked Successfully");
      dispatch(getUsersApi());
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Users ko fetch karna component mount par
  useEffect(() => {
    dispatch(getUsersApi());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Card className="h-full pt-10 md:pt-0 w-full mb-10 shadow-lg">
          <CardBody className="h-[70vh] overflow-auto px-0">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border px-4 py-2 text-left">
                      <Typography
                        variant="h6"
                        className="font-semibold text-gray-700"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Users?.length > 0 ? (
                  Users.map((item, index) => {
                    const isLast = index === Users.length - 1;
                    const classes = isLast ? "p-4" : "border px-4 py-2";

                    return (
                      <tr key={item?._id} className="hover:bg-gray-100">
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
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.fullname}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.phoneNumber}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item?.email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Switch
                            checked={item?.isBlocked}
                            onChange={() =>
                              handleToggleBlock(item?._id, item?.isBlocked)
                            }
                            color="red"
                            label={item?.isBlocked ? "Blocked" : "Unblocked"}
                          />
                        </td>
                        <td className={classes}>
                          <div className="flex space-x-2">
                            <Tooltip
                              content={
                                item?.isAdmin === true
                                  ? "Admin ko delete nahi kiya ja sakta"
                                  : "User ko delete karein"
                              }
                            >
                              <IconButton
                                disabled={item?.isAdmin === true}
                                onClick={() => handleDeleteUser(item?._id)}
                                variant="text"
                              >
                                <TrashIcon className="text-red-700 h-5 w-5" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={TABLE_HEAD.length}
                      className="text-center py-10 font-bold text-xl"
                    >
                      NO DATA...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <BlockReasonModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              userId={userIdToBlock}
            />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Users;
