import { Link } from "react-router-dom";
import logo from "../../assets/Tourism_logo.png";
import { useContext, useEffect } from "react";
import { AuthProvider } from "../../ContextProvider/ContextProvider";
import Swal from "sweetalert2";



const Header = () => {
  const {user,LogOut}=useContext(AuthProvider);


    const logOut = () => {
      LogOut()
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "You Have Logged Out",
            icon: "success",
            confirmButtonText: "Ok",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
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
    const menu = (
      <>
        <Link to="/" >
          <li className="text-2xl m-2">Home</li>
        </Link>
        <Link to="/menu">
          <li className="text-2xl m-2">Member Ship</li>
        </Link>      
        <Link to="/">
          <li className="text-2xl m-2">Contact Us</li>
        </Link>
      </>
    );

    const menu2 = (
      <>
        <Link to="/">
          <li className="text-xl m-2">Home</li>
        </Link>
        <Link to="/menu">
          <li className="text-xl m-2">Membership</li>
        </Link>
        <Link to="/">
          <li className="text-xl m-2">Contact Us</li>
        </Link>
      </>
    );
    return (
      <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu  bg-opacity-80 bg-black menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
              {menu2}
            </ul>
          </div>
          <div className="w-1/2">
            <img className="w-1/3 text-white" src={logo}></img>
          </div>
        </div>
        <div className="navbar-center hidden  lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>

        <div className="flex">
          {user ? (
            <button className="btn btn-ghost  btn-circle w-full">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          ) : (
            " "
          )}
          {user ? (
            <div className="dropdown dropdown-end mr-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {user?.photoURL ? (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  ) : (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  )}
                </div>
              </div>
              <ul className="menu menu-sm bg-opacity-80 bg-black dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <Link to="/dashboard/home">Dashboard</Link>
                </li>
                <li>
                  <Link onClick={logOut}>Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn btn-info text-white sm:btn-sm md:btn-md lg:btn-lg">
                Log-In
              </button>
            </Link>
          )}
        </div>
      </div>
    );
};

export default Header;