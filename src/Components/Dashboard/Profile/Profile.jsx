import React, { useContext } from 'react';
import { AuthProvider } from "../../../ContextProvider/ContextProvider";
import badge from "../../../assets/silver-badge.png"
const Profile = () => {
  const { user } = useContext(AuthProvider);
    return (
      <div>
        <div className="card card-side bg-base-100 shadow-xl flex flex-col md:flex-row">
          <figure>
            <img className="w-52 h-80" src={user.photoURL} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Name : {user.displayName}</h2>
            <div className="divider divider-info"></div>
            <p>email : {user.email}</p>
            <div className="divider divider-info"></div>
            <p className='flex items-center'>
              Membership :
              
              <img className="w-16 h-20 ml-3" src={badge} alt="Movie" />
              
            </p>
            <div className="divider divider-info"></div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Profile;