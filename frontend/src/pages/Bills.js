import React from "react";
// import { NavLink } from 'react-router-dom'
import Navbar from "../components/Navbar";

const Bills = () => {
  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-evenly items-center">
        <Navbar />
        <div className="h-full w-[85%]"></div>
      </div>
    </>
  );
};

export default Bills;
