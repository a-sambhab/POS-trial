import React, { useState } from "react";
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
            ? "w-[10%] sm:w-[18%] xl:w-full h-full xl:h-[20%] flex justify-evenly items-center text-center xl:p-[8%] text-lg hover:bg-gradient-to-r from-white via-green-200 to-green-400"
            : "w-[10%] sm:w-[18%] xl:w-full h-full xl:h-[20%] flex justify-evenly items-center bg-gradient-to-r from-white via-green-200 to-green-400 text-center xl:p-[8%] text-lg border-r-2 border-green-600"
        }}
        to={props.route}
      >
        <div className="w-full h-full flex justify-start items-center">
          <FontAwesomeIcon
            icon={props.icon}
            style={{ color: "#50DF84", paddingRight: "15px" }}
          />
          <div className="hidden sm:flex">{props.name}</div>
        </div>
      </NavLink>
    </>
  );
};

const Navbar = () => {
  const [isvisible, setIsvisible] = useState(false);
  return (
    <>
      <div className=" h-[5%] xl:h-full w-full xl:w-[15%] flex flex-row xl:flex-col justify-center items-center">
        <div className="h-[99%] w-full xl:border-r-2 border-black border-opacity-15 flex flex-row xl:flex-col">
          <div className="w-[20%] xl:w-full h-full xl:h-[10%] font-bold font-mono text-2xl xl:text-3xl italic text-center flex justify-evenly items-center">
            <div>POS</div>
          </div>
          <div className="w-4/5 xl:w-full h-full xl:h-[50%] flex flex-row xl:flex-col items-start justify-evenly">
            <Navbutton name="Menu" route="/" icon={faBars} />
            <Navbutton name="History" route="/history" icon={faBook} />
            <Navbutton name="Add Item" route="/addItem" icon={faSquarePlus} />
            <Navbutton
              name="Add Customer"
              route="/addCustomer"
              icon={faCircleUser}
            />
            <Navbutton
              name="Update Customer"
              route="/updateCustomer"
              icon={faPenToSquare}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
