import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const MenuItem = (props) => {
  const [itemcount, setItemcount] = useState(0);
  const addItem = () => {
    if (itemcount !== 0) {
      if (props.currentSale[props.item.name]) {
        props.setCurrentSale({
          ...props.currentSale,
          [props.item.name]: props.currentSale[props.item.name] + itemcount,
        });
      } else {
        props.setCurrentSale({
          ...props.currentSale,
          [props.item.name]: itemcount,
        });
      }
    }
    setItemcount(0);
    console.log(props.currentSale);
  };
  return (
    <div className="w-1/4 h-1/2 flex justify-center items-center">
      <div className="w-[98%] h-[98%] flex justify-evenly items-center flex-col border-2 rounded-lg bg-white">
        <div className="w-full h-[20%] flex flex-row justify-center items-stretch">
          <div className="w-[50%] h-full text-center pt-1">
            {props.item.name}
          </div>
          <div className="w-[50%] h-full text-center flex items-center justify-center">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              style={{ height: "40%", paddingRight: "5px" }}
            />
            {props.item.cost}
          </div>
        </div>
        <div className="w-[98%] h-[78%] flex flex-col justify-evenly items-center">
          <div className="w-full h-[40%] flex flex-row justify-evenly items-center">
            <FontAwesomeIcon
              icon={faMinusCircle}
              style={{ color: "#50df84", height: "50%" }}
              onClick={() => {
                if (itemcount > 0) {
                  setItemcount(itemcount - 1);
                }
              }}
            />
            <input
              className="w-[70%] text-center border-2 rounded-lg"
              type="number"
              min="0"
              value={itemcount}
              onChange={(e) => {
                setItemcount(Number(e.target.value));
                console.log(itemcount);
              }}
            />
            <FontAwesomeIcon
              icon={faPlusCircle}
              style={{ color: "#50df84", height: "50%" }}
              onClick={() => {
                setItemcount(itemcount + 1);
              }}
            />
          </div>
          <div className="w-full h-[30%] flex justify-center items-center">
            <button
              className="w-[95%] h-[95%] bg-[#50df84] bg-opacity-70 hover:bg-opacity-100 text-white text-lg rounded-2xl"
              onClick={addItem}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
