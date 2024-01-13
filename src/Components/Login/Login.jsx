import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthProvider } from '../../ContextProvider/ContextProvider';
import Swal from 'sweetalert2';
import logImg from "../../assets/Login-removebg-preview.png";
import SocialLogin from '../Shared/SocialLogin';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    
   
    const { signIn } = useContext(AuthProvider);
        const navigate = useNavigate();
        const location = useLocation();

        const from = location.state?.from?.pathname || "/";
    
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])

    
    const handleValidatecaptcha = (event) => {
      const loginButton = document.querySelector(".capt_btn");
     
      const user_captcha_value = event.target.value;
      if (validateCaptcha(user_captcha_value)) {
         loginButton.classList.remove("hidden");
      
      } else {
          loginButton.classList.add("hidden");
      }
    };

    const handleLogin = (event) => {
     event.preventDefault();
     const data = event.target;
     const email = data.email.value;
     const password = data.password.value;
     signIn(email, password)
       .then(() => {
         Swal.fire({
           position: "center",
           icon: "success",
           title: "You have Logged In successfully",
           showConfirmButton: false,
           timer: 1500,
         });

         navigate(from , {replace:true});
       })
       .catch(() => {
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: "Something went wrong!",
           footer: '<a href="#">Why do I have this issue?</a>',
         });
       });
    };
     const backgroundImageUrl = "https://i.ibb.co/SQLKxz7/authentication.png"; // Replace with the actual image path

     const containerStyle = {
       backgroundImage: `url(${backgroundImageUrl})`,
       backgroundSize: "cover",
       backgroundPosition: "center",
     };
   
    return (
      <>
        <Helmet>
          <title>TourBook Forum | Login</title>
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
              <h1 className="text-5xl font-bold m-5">Sign-In now!</h1>

              <div className="card flex-shrink-0 w-full max-w shadow-2xl bg-base-100">
                <form onSubmit={handleLogin} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                    />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <LoadCanvasTemplate />
                    </label>
                    <input
                      type="text"
                      name="captcha"
                      onBlur={handleValidatecaptcha}
                      placeholder="Type the captcha above"
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control mt-6">
                    <input
                      className="btn btn-info border-none text-white btn-primary capt_btn hidden"
                      type="submit"
                      value="Login"
                    />
                  </div>
                </form>
                <p className="text-center mb-4">
                  <small className="text-[#D1A054]">
                    New Here? <Link to="/signup">Create an account</Link>{" "}
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

export default Login;


