import React, { useContext } from 'react';
import auth from '../firebase/firebase.config';
import { AuthProvider } from '../ContextProvider/ContextProvider';
import CheckAdmin from '../CheckAdmin/CheckAdmin';
import {Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const { user, loader } = useContext(AuthProvider);
    const [isAdmin,loadingAdmin]=CheckAdmin();
    const location = useLocation();

    if (loader || loadingAdmin) {
      return <progress className="progress w-56"></progress>;
    }

    if (user && isAdmin) {
      return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;