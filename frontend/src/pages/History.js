import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SalesRow from "../components/SalesRow";
import axios from "axios";

const History = () => {
  const [sales, setSales] = useState([]);
  const getSales = async () => {
    const response = await axios.get("http://localhost:3001/getSales");
    setSales(response.data.sales);
  };
  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-col xl:flex-row justify-evenly items-center">
        <Navbar />
        <div className="h-full w-[85%] bg-black bg-opacity-[0.01] flex flex-col items-center justify-evenly">
          <div className="h-[10%] w-full text-left text-3xl italic pl-[2%] pt-[1.5%]">
            History
          </div>
          <div className="h-[88%] w-[98%] border-2 rounded-lg bg-white overflow-auto">
            <div className="h-[7.5%] w-full bg-black bg-opacity-[0.05] flex flex-row justify-evenly items-center text-gray-600">
              <div className="w-[12.5%] h-[98%] flex justify-center items-center truncate">Sales ID</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Customer ID</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Date</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Sales Type</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Payment Type</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Items Bought</div>
              {/* <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">CGST</div> */}
              {/* <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">SGST</div> */}
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Discount</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Extra Charges</div>
              <div className="w-[12.5%] h-[98%] border-l-2 flex justify-center items-center truncate">Total Bill</div>
            </div>
            {sales.map((s) => {
              return (
                <>
                  <SalesRow data={s} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
