import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faCircleUser,
  faPenToSquare,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

const Navbutton = (props) => {
  return (
    <>
      <NavLink
        className={({ isActive }) => {
          return !isActive
            ? "w-full h-[20%] flex justify-evenly items-center text-center p-[8%] text-lg hover:bg-gradient-to-r from-white via-green-200 to-green-400"
            : "w-full h-[20%] flex justify-evenly items-center bg-gradient-to-r from-white via-green-200 to-green-400 text-center p-[8%] text-lg border-r-2 border-green-600";
        }}
        to={props.route}
      >
        <div className="w-full h-full flex justify-start items-center">
          <FontAwesomeIcon icon={props.icon} style={{ color: "#50DF84", paddingRight: "15px" }} />
          {props.name}
        </div>
      </NavLink>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="h-full w-[15%] flex flex-col justify-center items-center">
        <div className="h-[99%] w-full border-r-2 border-black border-opacity-15">
          <div className="w-full h-[10%] font-bold font-mono text-3xl italic text-center flex justify-center items-center">
            <div>POS</div>
          </div>
          <div className="w-full h-[50%] flex flex-col items-start justify-evenly">
            <Navbutton name="Menu" route="/" icon={faBars} />
            <Navbutton name="History" route="/history" icon={faBook} />
            <Navbutton name="Add Item" route="/addItem" icon={faSquarePlus} />
            <Navbutton name="Add Customer" route="/addCustomer" icon={faCircleUser} />
            <Navbutton name="Update Customer" route="/updateCustomer" icon={faPenToSquare} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
