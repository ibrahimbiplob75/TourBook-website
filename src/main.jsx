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
        element: (
          <PrivateRoute>
            <DiscussionForm></DiscussionForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/discussion/:id",
        element: (
          <PrivateRoute>
            <DiscussionDetails></DiscussionDetails>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <Membership></Membership>
          </PrivateRoute>
        ),
      },
      {
        path: "/membership/:email",
        element: <Membership></Membership>,
      },
      {
        path: "/bookmark",
        element: <BookMark></BookMark>,
      },
      {
        path: "/announcement/:id",
        element: <AnnounceDetails></AnnounceDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/announcement/${params.id}`),
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
        path: "/dashboard/mypost",
        element: <Mypost></Mypost>,
      },
      {
        path: "/dashboard/discussion/edit/:id",
        element: <EditPost></EditPost>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/discussion/${params.id}`),
      },
      {
        path: "/dashboard/tags",
        element: <Tags></Tags>,
      },

      {
        path: "/dashboard/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/dashboard/manageitems",
        element: <ManagePost></ManagePost>,
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
import EditPost from './PostData/EditPost.jsx';
import Tags from './Components/Dashboard/Admin/Tags.jsx';
import BookMark from './Components/BookMark/BookMark.jsx';
import ManagePost from './Components/Dashboard/ManagePost.jsx';
import AnnounceDetails from './Components/Shared/AnnounceDetails.jsx';


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
