import { FaTrashAlt } from "react-icons/fa";
import UseCart from "../../UseCart/UseCart";
import Swal from "sweetalert2";
import AxiosPublic from "../../AxiosPublic/AxiosPublic";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = UseCart();
    const [axiosPublic]=AxiosPublic()
    const totalPrice= cart.reduce((sumPrice,item) =>{return sumPrice+ item.price},0);
  
    const hanadleDelete=(id)=>{
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
            axiosPublic.delete(`/carts/${id}`).then((res) => {
              if (res.data.deletedCount) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
              refetch();
            });
            
          }
        });
    }
    return (
      <div>
        <div className="flex flex-row justify-evenly items-center">
          <h2 className="text-3xl">Your Total Item {cart.length}</h2>
          <h2 className="text-3xl">Total Price {totalPrice}</h2>
          {cart.length > 0 ? (
            <Link to="/dashboard/payment">
              <button className="btn btn-secondary">Pay Now</button>
            </Link>
          ) : (
            <button disabled className="btn btn-secondary">
              Pay Now
            </button>
          )}
        </div>
        <div className="overflow-x-auto mt-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  {/* <label>
                    <input type="checkbox" className="checkbox" />
                  </label> */}
                </th>
                <th>Item</th>
                <th>Price</th>
                <th>Favorite Color</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.img}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    {/* Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span> */}
                    <h2 className="text-red-600">{item.price} $</h2>
                  </td>
                  <td>Purple</td>
                  <th>
                    <button
                      onClick={() => hanadleDelete(item._id)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Cart;