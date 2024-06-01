import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [balance, setBalance] = useState(0);
  const addCustomer = async () => {
    try {
      if (name === "") throw new Error("No Name Given");
      if (ID === "") throw new Error("No ID Given");
    //   if (balance === 0) throw new Error("Balance can not be 0");
      const response = await axios.post("http://localhost:3001/addCustomer", {
        name: name,
        id: Number(ID),
        balance: Number(balance),
      });
      console.log(response)
      if(response.status === 200) {
        alert("New Customer Added")
      }
      setName("")
      setID("")
      setBalance(0)
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-evenly items-center">
        <Navbar />
        <div className="h-full w-[85%] bg-black bg-opacity-[0.01] flex flex-col items-center justify-evenly">
          <div className="h-[10%] w-full text-left text-3xl italic pl-[2%] pt-[1.5%]">
            Add Customer
          </div>
          <div className="h-[87%] w-[98%] border-2 rounded-lg bg-white flex justify-center items-center">
            <div className="h-1/2 w-1/4 bg-black bg-opacity-5 rounded-lg border-2 flex flex-col justify-evenly items-center">
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-md">Customer Name: </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-md">
                  Customer ID:{" "}
                </label>
                <input
                  value={ID}
                  onChange={(e) => {
                    setID(e.target.value);
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-md">Balance: </label>
                <input
                  value={balance}
                  onChange={(e) => {
                    setBalance(Number(e.target.value));
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <button
                  className="w-1/2 h-1/2 rounded-lg border-2 text-white bg-opacity-70 transition-all duration-200 ease-in-out hover:bg-opacity-100 hover:text-green-900 bg-[#50df84]"
                  onClick={() => {
                    addCustomer();
                  }}
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCustomer;
