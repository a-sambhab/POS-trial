import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Categories = (props) => {
  const classes =
    props.category === props.value
      ? "h-[95%] w-[90%] bg-black bg-opacity-[0.05] border-2 border-black border-opacity-[0.1] rounded-lg flex flex-col justify-center items-center cursor-pointer"
      : "h-[95%] w-[90%] bg-white border-2 border-black border-opacity-[0.1] rounded-lg flex flex-col justify-center items-center transition-all duration-200 ease-in-out hover:bg-black hover:bg-opacity-[0.01] cursor-pointer";
  return (
    <>
      <div className="h-full w-[15%] flex justify-center items-center">
        <div
          className={classes}
          onClick={() => {
            props.setCategory(props.value);
            console.log(props.category);
          }}
        >
          <FontAwesomeIcon
            icon={props.icon}
            // style={{ height: "65%", width: "20%", opacity: "0.4" }}
            class="h-[30%] xl:h-[65%] w-1/5 opacity-40"
          />
          <div className="h-1/5 w-full text-center text-sm md:text-base xl:text-lg pb-1">
            {props.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
