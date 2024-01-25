import React from 'react';
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from 'sweetalert2';

const ManagePost = () => {
    const [publicAxios] = AxiosPublic();
    const {
      data: discussion = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["discussion"],
      queryFn: async () => {
        const res = await publicAxios.get("/discussion");
        return res.data;
      },
    });

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
           publicAxios.delete(`/discussion/${id}`).then(() => {
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
      <div className="w-full">
        <h3 className="text-3xl font-semibold my-4">Total discussion:{discussion.length}</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>title</th>
                <th>Author</th>
                <th>Author Mail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {discussion.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <th>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.image}
                          alt={user.title}
                        />
                      </div>
                    </div>
                  </th>
                  <td>{user.title}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-ghost bg-red-600  text-white"
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ManagePost;