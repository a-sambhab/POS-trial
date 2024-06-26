import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";

const MenuItem = (props) => {
  const addItem = () => {
    if (props.currentSale.find(item=> item.name===props.item.name)) {
      props.setCurrentSale(props.currentSale.map(sale => 
        sale.name === props.item.name ? {...sale, quantity: sale.quantity+1, cgstAmount: sale.cgstAmount+sale.cost*sale.cgst/100, sgstAmount: sale.sgstAmount+sale.cost*sale.sgst/100} : sale
      ))
    } else {
      props.setCurrentSale([
        ...props.currentSale,
        {
          ...props.item,
          quantity: 1,
          cgstAmount: props.item.cost*props.item.cgst/100,
          sgstAmount: props.item.cost*props.item.sgst/100,
        }
      ]);
    }

    console.log(props.currentSale);
  };
  return (
    <div className="w-1/5 h-1/3 flex justify-center items-center">
      <div
        className="w-[98%] h-[98%] flex justify-evenly items-center flex-col border-2 bg-[#50df84] bg-opacity-70 hover:bg-opacity-100 text-white text-lg rounded-2xl cursor-pointer"
        onClick={()=>{console.log(props.item.name); addItem()}}
        // onClick={addItem()}
      >
        <div className="w-full h-[20%] flex flex-row justify-center items-stretch text-wrap">
          <div className="w-[50%] h-full flex justify-center items-center text-center pt-1">
            {props.item.name}
          </div>
          <div className="w-[50%] h-full text-center flex items-center justify-center">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              // style={{ height: "40%", paddingRight: "5px" }}
              class="h-4/5 xl:h-3/5"
            />
            {props.item.cost}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
