/* eslint-disable @typescript-eslint/no-explicit */
import { useState } from "react";
import Logo from "../images/Logo.svg";
import { z } from "zod";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Loader from "../component/Loader";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserApi } from "../features/slicer/LoginUserSlicer";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.LoginUserSlicer);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Validate the form values
      schema.parse(formValues);
      setErrors({ email: "", password: "" });

      // If validation passes, proceed with form submission
      dispatch(LoginUserApi(formValues));
      console.log("Form submitted", formValues);

      // Add your sign-in logic here
    } catch (error) {
      // Set errors if validation fails
      const fieldErrors = error.formErrors.fieldErrors;
      setErrors({
        email: fieldErrors.email ? fieldErrors.email[0] : "",
        password: fieldErrors.password ? fieldErrors.password[0] : "",
      });
    }
  };
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="flex  font-Montserrat  text-center h-screen items-center ">
      <div className="flex-1 hidden text-start md:flex flex-col justify-between bg-[#FF725E] h-screen overflow-y-hidden">
        <div className="py-20 pl-20">
          {/* <img src={Logo} alt="logo" className="  w-80 h-fit object-contain " />
           */}
          <h1 className=" text-4xl text-white font-bold  ">
            AARMA ADMIN PORTAL
          </h1>
        </div>
        <div className="pb-20 text-secondary ">
          <h1 className="pl-20 text-3xl text-white font-bold">
            Create Account
          </h1>
          <h2 className="pl-20 text-2xl text-white ">
            Create Account and Move Forward
          </h2>
        </div>
      </div>
      <div className=" h-screen pt-4  flex-1 px-2  ">
        <div className=" cursor-pointer flex justify-end pr-2">
          <div className=" duration transition ease-in-out hover:scale-110 hover:animate-pulse  text-secondary  w-12 h-12 flex justify-center items-center bg-primary rounded-full">
            <Link to="/">
              <i className="fa-solid fa-house"></i>
            </Link>
          </div>
        </div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              value={formValues.email}
              onChange={handleInputChange}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                placeholder={""}
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              name="password"
              crossOrigin="" // Add the missing crossOrigin property
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              value={formValues.password}
              onChange={handleInputChange}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-6 bg-[#FF725E]"
            fullWidth
          >
            sign in
          </Button>
        </form>
      </div>
      {isLoading && <Loader />}
    </section>
  );
}

export default Login;
