import React from "react";

const ItemsBought = (props) => {
  return (
    <>
      {!props.isvisible ? (
        <></>
      ) : (
        <>
          <div className="w-screen h-screen bg-white bg-opacity-40 fixed top-0 left-0 flex justify-center items-center">
            <div className="w-1/2 h-1/2 bg-white border-2 rounded-xl flex flex-col items-center justify-evenly">
              <div className="h-[85%] w-[98%] border-2 rounded-lg bg-white flex flex-col items-center justify-start overflow-auto">
                <div className="h-[10%] w-full flex items-center justify-evenly bg-black bg-opacity-5 text-gray-600 ">
                  <div className="w-[20%] h-[98%] border-l-2 flex justify-center items-center truncate">
                    Item Name
                  </div>
                  <div className="w-[20%] h-[98%] border-l-2 flex justify-center items-center truncate">
                    Quantity
                  </div>
                  <div className="w-[20%] h-[98%] border-l-2 flex justify-center items-center truncate">
                    CGST
                  </div>
                  <div className="w-[20%] h-[98%] border-l-2 flex justify-center items-center truncate">
                    SGST
                  </div>
                  <div className="w-[20%] h-[98%] border-l-2 flex justify-center items-center truncate">
                    Amount
                  </div>
                </div>
                {props.items.map((i) => {
                  return (
                    <>
                      <div className="h-[10%] w-full flex items-center justify-center border-b-2">
                        <div className="w-[20%] h-[98%] flex justify-center items-center truncate ">{i.name}</div>
                        <div className="w-[20%] h-[98%] flex justify-center items-center truncate border-l-2">{i.quantity}</div>
                        <div className="w-[20%] h-[98%] flex justify-center items-center truncate border-l-2">{i.cgstAmount}</div>
                        <div className="w-[20%] h-[98%] flex justify-center items-center truncate border-l-2">{i.sgstAmount}</div>
                        <div className="w-[20%] h-[98%] flex justify-center items-center truncate border-l-2">{i.quantity*i.cost+i.sgstAmount+i.cgstAmount}</div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="h-[10%] w-full flex justify-center items-center">
                <button
                  onClick={() => {
                    props.setIsvisible(false);
                  }}
                  className="w-[60%] h-[95%] bg-[#50df84] bg-opacity-70 text-white transition-all duration-200 ease-in-out hover:bg-opacity-100 hover:text-green-900 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItemsBought;
