import React, { useState } from "react";

const ItemsBought = (props) => {
  const [isvisible, setIsvisible] = useState(false);
  const handleMouse = (value) => {
    setIsvisible(value);
  };
  console.log(props.items);
  return (
    <>
      <div className="w-[95%] h-[95%]" onMouseEnter={()=>{handleMouse(true)}} onMouseLeave={()=>{handleMouse(false)}}>
        {!isvisible ? (
          <>
            <div className=" h-full w-full flex justify-center items-center text-blue-700 underline">Sales Content</div>
          </>
        ) : (
          <ul className="h-full w-full flex flex-col items-center justify-center overflow-auto">
          {Object.keys(props.items).map(i=>{
            return(
                <>
                    <li className="truncate">{i}: {props.items[i]}</li>
                </>
            )
          })}
          </ul>
        )}
      </div>
    </>
  );
};

export default ItemsBought;
