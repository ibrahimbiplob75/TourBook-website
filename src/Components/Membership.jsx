import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthProvider } from '../ContextProvider/ContextProvider';
import UseCart from '../UseCart/UseCart';

const Membership = () => {
    const {user}=useContext(AuthProvider)
    const [cart]=UseCart()
    console.log(cart)
    
    return (
      <div className="w-4/5 m-auto md:w-1/2 mx-auto mb-10">
        <div className="card shrink-0  shadow-2xl bg-base-100">
          <h1 className="text-center m-4 font-bold text-xl">
            Update Membership
          </h1>
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                readOnly
                defaultValue={user?.displayName}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                readOnly
                className="input input-bordered"
                defaultValue={user?.email}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Payment</span>
              </label>
              <input
                type="email"
                placeholder="email"
                readOnly
                className="input input-bordered"
                defaultValue="500"
                required
              />
              <label className="label">
                <a href="#" className="text-red-600 label-text-alt link link-hover">
                  After 1 year subscrption will be expire
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <Link to="/dashboard/payment" className="btn btn-primary">
                Apply
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Membership;