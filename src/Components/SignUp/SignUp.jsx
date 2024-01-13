import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../ContextProvider/ContextProvider";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import logImg from "../../assets/Register-removebg.png";
import SocialLogin from "../Shared/SocialLogin";
import AxiosPublic from "../../AxiosPublic/AxiosPublic";
import { Helmet } from "react-helmet-async";

const imgAPI = import.meta.env.VITE_IMGBB_API_KEY;
const pathAPI = `https://api.imgbb.com/1/upload?key=${imgAPI}`;

const SignUp = () => {
   const {
     register,
     reset,
     handleSubmit,
     formState: { errors },
   } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthProvider);
   const navigate = useNavigate();
   const [publicAxios]=AxiosPublic();
  const onSubmit = async(data) => {
 
    console.log(data);
    console.log(data.photoURL[0])
    const imgFile={image:data.photoURL[0]};
    const res = await publicAxios.post(pathAPI, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if(res.data.success){
      const photo = res.data.data.display_url;

      createUser(data.email, data.password).then(() => {
        updateUserProfile(data.name, photo)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: photo,
            };
            publicAxios.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          });
      });
    }
  }
  const backgroundImageUrl = "https://i.ibb.co/SQLKxz7/authentication.png"; // Replace with the actual image path

  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover", 
    backgroundPosition: "center", 
 
  };
  return (
    <>
      <Helmet>
        <title>TourBook Forum | Sign Up</title>
      </Helmet>
      <div className="hero " style={containerStyle}>
        <div
          className="hero-content flex-col lg:flex-row shadow-2xl rounded-xl w-2/3 mt-36 mb-8"
          style={containerStyle}
        >
          <div>
            <img src={logImg} alt="" />
          </div>
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold m-5">Sign up now!</h1>

            <div className="card flex-shrink-0 w-full max-w shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    placeholder="password"
                    className="input input-bordered"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="file"
                    {...register("photoURL", { required: true })}
                    name="photoURL"
                    className="file-input file-input-bordered file-input-info  w-full max-w-xs"
                  />
                  {errors.photoURL && (
                    <span className="text-red-600">Photo URL is required</span>
                  )}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-info border-none text-white"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>
              <p className="text-center mb-4">
                <small className="text-[#D1A054]">
                  Already have an account?<Link to="/login">Login</Link>
                </small>
              </p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
