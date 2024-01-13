import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthProvider } from "../ContextProvider/ContextProvider";

const PrivateRoute = ({ children }) => {
  const { user, loader } = useContext(AuthProvider);
  const location = useLocation();

  if (loader) {
    return <progress className="progress w-56"></progress>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
