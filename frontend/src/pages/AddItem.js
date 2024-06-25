import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddItem = () => {
  const [itemnam, setItemnam] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const addItem = async () => {
    try {
      if (itemnam === "") throw new Error("No Name Given");
      if (category === "") throw new Error("No Category Given");
      if (cost === 0) throw new Error("Cost can not be 0");
      const response = await axios.post("http://localhost:3001/addItem", {
        name: itemnam,
        group: category,
        cost: Number(cost),
        cgst: Number(cgst),
        sgst: Number(sgst)
      });
      console.log(response);
      if (response.status === 200) {
        alert("New Item Added");
      }
      setItemnam("");
      setCategory("");
      setCost(0);
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
            Add Item
          </div>
          <div className="h-[88%] w-[98%] border-2 rounded-lg bg-white flex justify-center items-center">
            <div className="h-[75%] xl:h-2/3 w-1/2 xl:w-1/3 bg-black bg-opacity-5 rounded-lg border-2 flex flex-col justify-evenly items-center">
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  Item Name:{" "}
                </label>
                <input
                  value={itemnam}
                  onChange={(e) => {
                    setItemnam(e.target.value);
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  Item Category:{" "}
                </label>
                <input
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  Cost:{" "}
                </label>
                <input
                  value={cost}
                  type="number"
                  min="0"
                  onChange={(e) => {
                    setCost(Number(e.target.value));
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  CGST:{" "}
                </label>
                <input
                  value={cgst}
                  type="number"
                  min="0"
                  onChange={(e) => {
                    setCgst(Number(e.target.value));
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <label className="w-[90%] text-left text-2xl xl:text-md">
                  SGST:{" "}
                </label>
                <input
                  value={sgst}
                  type="number"
                  min="0"
                  onChange={(e) => {
                    setSgst(Number(e.target.value));
                  }}
                  className="w-[90%] bg-white border-2 rounded-lg"
                />
              </div>
              <div className="w-full h-1/6 flex flex-col items-center justify-center">
                <button
                  className="w-1/2 h-1/2 text-xl xl:text-base rounded-lg border-2 text-white bg-opacity-70 transition-all duration-200 ease-in-out hover:bg-opacity-100 hover:text-green-900 bg-[#50df84]"
                  onClick={() => {
                    addItem();
                  }}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
