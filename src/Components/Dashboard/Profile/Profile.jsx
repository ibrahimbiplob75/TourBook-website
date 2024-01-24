import React, { useContext } from 'react';
import { AuthProvider } from "../../../ContextProvider/ContextProvider";
import Bronzebadge from "../../../assets/silver-badge.png"
import Goldbadge from "../../../assets/gold-badge.png"
import UseCart from '../../../UseCart/UseCart';
const Profile = () => {
  const { user } = useContext(AuthProvider);
  const [cart]=UseCart();
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
            <p className="flex items-center">
              Membership :
              {cart?.email === user?.email && cart?.transactionId !== null ? 
              <img className="w-16 h-20 ml-3" src={Goldbadge} alt="Badge" />
              :
              <img className="w-16 h-20 ml-3" src={Bronzebadge} alt="Badge" />
              }
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