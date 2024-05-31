import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <div className="h-full w-[15%] flex flex-col justify-center items-center">
        <div className="h-[99%] w-full border-r-2 border-black border-opacity-15">
          <div className="w-full h-[10%] font-bold font-mono text-3xl italic text-center flex justify-center items-center">
            <div>POS</div>
          </div>
          <div className="w-full h-[50%] flex flex-col items-start justify-evenly">
            <NavLink
              className={({ isActive }) => {
                return !isActive
                  ? "w-full h-[20%] flex justify-evenly items-center text-center p-[8%] text-lg hover:bg-gradient-to-r from-white via-green-200 to-green-400"
                  : "w-full h-[20%] flex justify-evenly items-center bg-gradient-to-r from-white via-green-200 to-green-400 text-center p-[8%] text-lg border-r-2 border-green-600";
              }}
              to="/"
            >
              <div className="w-full h-full flex justify-evenly items-center">
                <FontAwesomeIcon icon={faBars} style={{ color: "#50DF84" }} />
                Menu
              </div>
            </NavLink>  
            <NavLink
              // className="w-full h-[20%] flex justify-center items-center"
              className={({ isActive }) => {
                return !isActive
                  ? "w-full h-[20%] flex justify-center items-center text-center p-[8%] text-lg hover:bg-gradient-to-r from-white via-green-200 to-green-400"
                  : "w-full h-[20%] flex justify-center items-center bg-gradient-to-r from-white via-green-200 to-green-400 text-center p-[8%] text-lg border-r-2 border-green-600";
              }}
              to="/history"
            >
              <div className="w-full h-full flex justify-evenly items-center">
                {" "}
                <FontAwesomeIcon icon={faBook} style={{ color: "#50DF84" }} />
                History
              </div>
            </NavLink>
            <NavLink
              // className="w-full h-[20%] flex justify-center items-center"
              className={({ isActive }) => {
                return !isActive
                  ? "w-full h-[20%] flex justify-center items-center text-center p-[8%] text-lg hover:bg-gradient-to-r from-white via-green-200 to-green-400"
                  : "w-full h-[20%] flex justify-center items-center bg-gradient-to-r from-white via-green-200 to-green-400 text-center p-[8%] text-lg border-r-2 border-green-600";
              }}
              to="/bills"
            >
              <div className="w-full h-full flex justify-evenly items-center">
                <FontAwesomeIcon
                  icon={faFileInvoice}
                  style={{ color: "#50DF84" }}
                />
                Bills
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
