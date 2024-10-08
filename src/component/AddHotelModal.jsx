import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, Input } from "@material-tailwind/react";
import { AddHotelApi } from "../features/slicer/AddHotelSlicer";
// import { AddPortfolioApi, modalPortfolio, modalPortfolioClose } from "../features/slicer/AddPortfolioSlicer";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
//   width: 400,
  bgcolor: "background.paper",
  border: "none",
  // borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};


export default function AddHotelModal({modalOpen ,handleClose} ) {
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState({
    placeTitle: "",
    description: "",
    address: "",
    pricePerNight: "",
    city: "",
    location: "",
    roomsAvailable : ""
  });
  const [images, setImages] = useState([]);
  const fileInputRefPortfolioImg = useRef(null);


  const handleFileChangePortfolio = (event ) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleCover = () => {
    if (fileInputRefPortfolioImg.current) {
      fileInputRefPortfolioImg.current.click();
    }
  };

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddHotel = () => {
    if (
      !hotel.placeTitle ||
      !hotel.pricePerNight ||
      !hotel.city ||
      !hotel.location ||
      !hotel.description ||
      !hotel.address ||
      !hotel.roomsAvailable ||
      images.length === 0
    ) {
      toast.error("Please fill all fields");
    } else {
      const formData = new FormData();
      formData.append("placeTitle", hotel.placeTitle);
      formData.append("description", hotel.description);
      formData.append("city", hotel.city);
      formData.append("address", hotel.address);
      formData.append("location", hotel.location);
      formData.append("pricePerNight", hotel.pricePerNight);
      formData.append("roomsAvailable", hotel.roomsAvailable);
      images.forEach((image) => {
        formData.append(`images`, image);
      });
      // formData.append("portfolio", selectedPortfolioImages);
      dispatch(AddHotelApi(formData));
      setImages([]);
      setHotel({
        placeTitle: "",
        description: "",
        address: "",
        location: "",
        city: "",
        pricePerNight: "",
        roomsAvailable: ""

      });
      handleClose()
    }
  };
  return (
    <div>
     
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style} className=" w-[300px]  md:w-[500px]">
            <div className="  flex  pb-4 justify-center flex-col ">
               <div className="flex justify-between">

                <h2 className="text-xl font-semibold capitalize text-onPrimary "> Add Hotel Form</h2>
               <i onClick={handleClose} className="cursor-pointer  text-2xl fa-solid fa-xmark"></i>
               </div>
              <div>
                <label>Title </label>
                <Input
                label="Hotel Name"
                  onChange={handleChange}
                  name="placeTitle"
                  value={hotel?.placeTitle}
                />
              </div>
              <div>
                <label>Description </label>
                <Input
                  onChange={handleChange}
                  name="description"
                  label="Hotel Description"
                  value={hotel?.description}
                />
              </div>
              <div>
                <label>Address </label>
                <Input
                  type="text"
                  onChange={handleChange}
                  name="address"
                  label="Enter Address"
                  value={hotel?.address}
                />
              </div>
              <div>
                <label>location </label>
                <Input
                label="Location"
                  type="text"
                  onChange={handleChange}
                  name="location"
                  value={hotel?.location}
                />
              </div>
              <div>
                <label>city </label>
                <Input
                label="Enter City"
                  type="text"
                  onChange={handleChange}
                  name="city"
                  value={hotel?.city}
                />
              </div>
              <div>
                <label>Price Per Night </label>
                <Input
                label="Price Per Night"
                  type="number"
                  onChange={handleChange}
                  name="pricePerNight"
                  value={hotel?.pricePerNight}
                />
              </div>
              <div>
                <label>No of Rooms  </label>
                <Input
                label="No of rooms"
                  type="number"
                  onChange={handleChange}
                  name="roomsAvailable"
                  value={hotel?.roomsAvailable}
                />
              </div>

              <div className="flex gap-2 my-2 h-28 ">
                <div
                  className="bg-onSecondary rounded-lg justify-center  flex items-center p-1 flex-col w-42"
                  onClick={handleCover}
                >
                  <i className="  fa-solid fa-plus"></i>
                  <p className="text-sm text-center">upload Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRefPortfolioImg}
                    onChange={handleFileChangePortfolio}
                    className="hidden"
                    multiple // Allow multiple file selection
                  />
                </div>

                {images.length > 0 && (
                  <div className=" bg-onPrimary p-2 rounded-lg w-fit  h-22 overflow-x-scroll overflow-y-hidden flex gap-4">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        className="h-20 w-20 object-cover  object-center rounded-md"
                        alt={`Portfolio Image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <span className="flex justify-end gap-2">
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleAddHotel}>
                Save
              </Button>
            </span>
          </Box>
        </>
      </Modal>
    </div>
  );
}
