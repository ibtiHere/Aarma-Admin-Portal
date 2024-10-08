import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactApi } from "../features/slicer/GetAllContactForm";
   

  const ContactForm =() => {
    const dispatch = useDispatch()
    const {ContactForms} = useSelector((state) => state.GetAllContactForm);
    console.log(ContactForms)

    useEffect(()=>{

      dispatch(getContactApi());
    },[])
    return (
        <div className="h-auto overflow-scroll  grid md:grid-cols-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8 ">
{ContactForms.length >0 && ContactForms[0]?.message ? ContactForms.map((user)=>{
    return(

    
      <Card key={user?._id} color="white" shadow={false} className="shadow-2xl shadow-gray-400 w-full p-4 max-w-[26rem]">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
          <Avatar
            size="lg"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="tania andrew"
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                {user?.firstname  ?( user?.firstname + " " + user?.lastname):
                user?.firstName + " " + user?.lastName}
              </Typography>
              
            </div>
            <Typography color="blue-gray">{user?.email}</Typography>
            <Typography color="blue-gray"> {user?.phone}</Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0 flex flex-col gap-2">
            <h2 className="font-semibold">SUBJECT: <span className="font-normal">{ user ? user?.subject :''} </span> </h2>
          <span className="font-semibold flex gap-2 h-20 max-h-20 overflow-auto" >MESSAGE: <Typography className=" ">
            {user ? user?.message : ""}
          </Typography>
          </span>
        </CardBody>
      </Card>
      )
    }):
    <p className="
    absolute top-0 w-full left-0 h-screen flex justify-center items-center font-bold text-2xl
    ">
      No Data Found 
      </p>}
            </div>
    );
  }
  export default ContactForm;