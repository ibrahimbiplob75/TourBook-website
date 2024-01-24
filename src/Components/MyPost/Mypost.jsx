import React, { useContext } from 'react';
import PostData from '../../PostData/PostData';
import { AuthProvider } from '../../ContextProvider/ContextProvider';
import Swal from 'sweetalert2';
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { Link } from 'react-router-dom';

const Mypost = () => {
    const [discussion,refetch]=PostData();
    const [axiosPublic]=AxiosPublic();
    const {user}=useContext(AuthProvider)
    const filteredDiscussions = discussion.filter(
      (discussion) => discussion.email === user.email
    );
    

     const handleDelete = (id) => {
       Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!",
       }).then((result) => {
         if (result.isConfirmed) {
           axiosPublic.delete(`/discussion/${id}`).then(() => {
             refetch();
             Swal.fire({
               title: "Deleted!",
               text: "Your post has been deleted.",
               icon: "success",
             });
           });
         }
       });
     };
    
    
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
                <Link
                  to={`/dashboard/discussion/edit/${discussion._id}`}
                  className="btn btn-active btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(discussion._id)}
                  className="ml-6 btn btn-active btn-secondary"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Mypost;



   
  