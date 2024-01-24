import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';
import ContextProvider from './ContextProvider/ContextProvider.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Dashboard from "./Components/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/discussion/form",
        element: <DiscussionForm></DiscussionForm>,
      },
      {
        path: "/discussion/:id",
        element: <DiscussionDetails></DiscussionDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/discussion/${params.id}`),
      },

      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/membership",
        element: <Membership></Membership>,
      },
      {
        path: "/membership/:email",
        element: <Membership></Membership>,
        
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/home",
        element: <DashHome></DashHome>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path:"/dashboard/mypost",
        element:<Mypost></Mypost>

      },

      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },

      //Admin route
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addItem",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
    ],
  },
]);
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import DashHome from './Components/Dashboard/DashHome.jsx';
import AllUsers from './Components/Dashboard/Admin/AllUsers.jsx';
import AdminRoute from './PrivateRoute/AdminRoute.jsx';
import AddItem from './Components/Dashboard/AddItem/AddItem.jsx';
import Payment from './Components/Dashboard/Payment/Payment.jsx';
import { HelmetProvider } from 'react-helmet-async';
import DiscussionForm from './Components/Home/DiscussionForm.jsx';
import DiscussionDetails from './Components/Home/DiscussionDetails.jsx';
import Profile from './Components/Dashboard/Profile/Profile.jsx';
import Membership from './Components/Membership.jsx';
import Mypost from './Components/MyPost/Mypost.jsx';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <div className="max-w mx-2">
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </HelmetProvider>
    </ContextProvider>
  </React.StrictMode>
);
