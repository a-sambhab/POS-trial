import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import axios from "axios";

const UpdateCustomer = () => {
  const [Customers, setCustomers] = useState([]);
  const [custOptions, setcustOptions] = useState([]);
  const [currcust, setCurrcust] = useState({});
  const [balance, setBalance] = useState(0);
  const getCustomers = async () => {
    const response = await axios.get("http://localhost:3001/getCustomers");
    setCustomers(response.data.Customers);
    var trial = [];
    for (const i of response.data.Customers) {
      trial.push({ value: i.id, label: i.name });
    }
    setcustOptions(trial);
  };
  useEffect(() => {
    getCustomers();
  }, []);
  const addCustomer = async () => {
    try {
      if (currcust.id === undefined) throw new Error("User not selected");
      if (balance === 0) throw new Error("Balance not added");
      const response = await axios.put("http://localhost:3001/updateCustomer", {
        id: currcust.id,
        balance: balance,
      });
      // console.log(response);
      if(response.status === 200) {
        alert("Balance added Successfully")
        setCurrcust({id: "", balance: 0});
        setBalance(0);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col xl:flex-row justify-evenly items-center">
        <Navbar />
        <div className="h-full w-[85%] bg-black bg-opacity-[0.01] flex flex-col items-center justify-evenly">
          <div className="h-[10%] w-full text-left text-3xl italic pl-[2%] pt-[1.5%]">
            Add Customer
          </div>
          <div className="h-[87%] w-[98%] border-2 rounded-lg bg-white flex justify-center items-center">
            <div className="h-[75%] xl:h-1/2 w-1/2 xl:w-1/4 bg-black bg-opacity-5 rounded-lg border-2 flex flex-col justify-evenly items-center">
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <label className="w-[95%] text-left text-2xl xl:text-md">
                  Customer Name
                </label>
                <Select
                  options={custOptions}
                  className="w-[95%] bg-black bg-opacity-5"
                  value={currcust.label}
                  onChange={(selectedOption) => {
                    setCurrcust(
                      Customers.find((cust) => cust.id === selectedOption.value)
                    );
                    console.log(currcust);
                  }}
                />
              </div>
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  Customer ID:{" "}
                </label>
                <input
                  value={currcust.id}
                  disabled
                  onChange={(e) => {
                    // setID(e.target.value);
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/4 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  Add Balance:{" "}
                </label>
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
                  className="w-1/2 h-1/2 rounded-lg text-xl xl:text-base border-2 text-white bg-opacity-70 transition-all duration-200 ease-in-out hover:bg-opacity-100 hover:text-green-900 bg-[#50df84]"
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

export default UpdateCustomer;
