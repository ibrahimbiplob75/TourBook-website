import { useQuery } from "@tanstack/react-query";

import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../AxiosSecure/UseAxiosSecure";
import { useContext } from "react";
import { AuthProvider } from "../../../ContextProvider/ContextProvider";



const AllUsers = () => {
  const [AxiosSecure] = UseAxiosSecure();
  const {DeleteUser}=useContext(AuthProvider)

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/all/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
          AxiosSecure.patch(`/user/admin/${user._id}`).then((res)=>{
            if(res.data.modifiedCount>0){
              refetch();
              Swal.fire({
                title: "Admin!",
                text: `${user.name} is Admin now`,
                icon: "success",
              });
            }
            
          })
          
      }
    });
  
  }
  const handleDelete = (user) => {
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

        AxiosSecure.delete(`/users/${user}`).then(()=>{
          refetch();
          DeleteUser();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        })
        
      }
    });
  };


  return (
    <div className="w-full">
      
      <h3 className="text-3xl font-semibold my-4">
         Total Users: 
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role === "admin" ? (
                    "admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-orange-600  text-white"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
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

export default AllUsers;
