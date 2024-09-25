import React from "react";
import "./App.scss";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useSelector } from "react-redux";

const App = () => {
  const currentUser=useSelector(state=>state.user.currentUser);
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const ProtectedRoute=({children})=>{
  if(!currentUser){
    return <Navigate to={'/login'}/>
  }
  return children;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const darkMode=useSelector(state=>state.darkMode.darkMode);
  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
