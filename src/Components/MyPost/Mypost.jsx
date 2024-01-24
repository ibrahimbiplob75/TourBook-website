import React, { useContext } from 'react';
import PostData from '../../PostData/PostData';
import { AuthProvider } from '../../ContextProvider/ContextProvider';

const Mypost = () => {
    const [discussion]=PostData();
    const {user}=useContext(AuthProvider)
    const filteredDiscussions = discussion.filter(
      (discussion) => discussion.email === user.email
    );
    
    
    return (
      <div>
        {filteredDiscussions.map((discussion) => (
          <div key={discussion._id} className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img
                src={discussion.image}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-3xl font-bold">{discussion.title}</h1>
                <p className="py-6">{discussion.descriptions}</p>
                <button className="btn btn-active btn-primary">Edit</button>
                <button className="ml-6 btn btn-active btn-secondary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Mypost;



   
  