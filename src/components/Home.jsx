import React, { useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div className="flex">
      <SideBar />
      <div className="grow ml-64">
        <NavBar />
          <Outlet />
      </div>
    </div>
  );
};

export default Home;
