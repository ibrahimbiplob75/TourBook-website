import React from 'react';
import { FaBookmark, FaHome, FaAccusoft, FaWpforms, FaUtensils, FaWallet, FaBook, FaUsers, FaListAlt, FaUser, FaBell, FaDiscourse } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import CheckAdmin from '../../CheckAdmin/CheckAdmin';

const Dashboard = () => {
    const [isAdmin]=CheckAdmin();
    
    return (
      <div className="flex">
        {/* sidebar */}
        <div className="w-64 min-h-screen bg-orange-400 m-2 rounded-xl shadow-2xl">
          <ul className="menu">
            <>
              <li className="mt-4">
                <NavLink to="/dashboard/home">
                  <FaHome></FaHome>Home
                </NavLink>
              </li>

              <li className="mt-4 text-white bg-green-800 rounded-xl">
                <NavLink to="/dashboard/profile">
                  <FaUser></FaUser>My Profile
                </NavLink>
              </li>

              <li className="mt-4 text-white bg-green-800 rounded-xl">
                <NavLink to="/dashboard/cart">
                  <FaWpforms></FaWpforms>My Post
                </NavLink>
              </li>

              <li className="mt-4 text-white bg-green-800 rounded-xl">
                <NavLink to="/discussion/form">
                  <FaListAlt></FaListAlt> Add post
                </NavLink>
              </li>

              <li className="mt-4 text-white bg-green-800 rounded-xl">
                <NavLink to="/dashboard/reservation">
                  <FaBookmark></FaBookmark>Bookmark
                </NavLink>
              </li>
            </>
            {isAdmin ? (
              <>
                <li className="mt-4 text-white bg-green-800 rounded-xl">
                  <NavLink to="/dashboard/addItem">
                    {" "}
                    <FaBell></FaBell>Announcement Post
                  </NavLink>
                </li>
                <li className="mt-4 text-white bg-green-800 rounded-xl">
                  <NavLink to="/dashboard/manageitems">
                    <FaDiscourse></FaDiscourse> Manage Discussion
                  </NavLink>
                </li>
                <li className="mt-4 text-white bg-green-800 rounded-xl">
                  <NavLink to="/">
                    <FaBook></FaBook> Manage Bookings
                  </NavLink>
                </li>
                <li className="mt-4 text-white bg-green-800 rounded-xl">
                  <NavLink to="/dashboard/allusers">
                    <FaUsers></FaUsers> All Users
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}

            <div className="divider "></div>

            <li className="mt-4 text-white bg-green-800 rounded-xl">
              <NavLink to="/">
                <FaAccusoft></FaAccusoft>Website
              </NavLink>
            </li>
          </ul>
        </div>
        {/* constent area */}
        <div className="flex-1 m-4">
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default Dashboard;