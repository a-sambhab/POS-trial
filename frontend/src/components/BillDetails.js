import React, { useEffect, useState } from "react";
import axios from "axios";
const BillDetails = () => {
    const [Customers, setCustomers] = useState([])
    const [currcust, setCurrcust] = useState("")
    const getCustomers = async () => {
        const response = await axios.get("http://localhost:3001/getCustomers")
        setCustomers(response.data.Customers)
    }
    useEffect(() => {
      getCustomers();
    }, [])
    
  return (
    <>
      <div className="h-[99%] w-full border-l-2 border-black border-opacity-15">
        <div className="w-full h-[10%] text-3xl italic text-center flex justify-center items-center">
          <div>Bill Details</div>
        </div>
        <div className="w-full h-[15%] flex flex-col items-center justify-evenly">
          <label className="w-[95%] text-left text-lg">Customer Name</label>
          <select
            className="border-2 rounded-lg w-[95%] bg-black bg-opacity-[0.01] p-1"
            placeholder="Enter Name"
            value={currcust}
            onChange={(e)=>{setCurrcust(e.target.value)}}
          >
            {Customers.map((cust)=>{
                return(
                    <option value={cust.name}>{cust.name}</option>
                )
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default BillDetails;
