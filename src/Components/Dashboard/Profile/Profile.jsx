import React from 'react';

const Profile = () => {
    return (
      <div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            
            <h2 className="card-title">Name:</h2>
            <div className="divider divider-info"></div>
            <p>email:</p>
            <div className="divider divider-info"></div>
            <p>Membership</p>
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