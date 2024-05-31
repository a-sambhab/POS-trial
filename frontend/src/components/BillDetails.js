import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faMinusCircle,
  faMinusSquare,
  faPlusCircle,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
const BillDetails = (props) => {
  const [Customers, setCustomers] = useState([]);
  const [custOptions, setcustOptions] = useState([]);
  const [currcust, setCurrcust] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [extracharges, setExtracharges] = useState(0);
  const [salestype, setSalestype] = useState("paid")
  const [grandtotal, setGrandtotal] = useState(subtotal);
  const getCustomers = async () => {
    const response = await axios.get("http://localhost:3001/getCustomers");
    setCustomers(response.data.Customers);
    var trial = [];
    for (const i of response.data.Customers) {
      trial.push({ value: i.id, label: i.name });
    }
    setcustOptions(trial);
  };
  const calculateSubtotal = () => {
    var subt = 0;
    Object.keys(props.currentSale).map((key) => {
      subt =
        subt +
        props.items.find((i) => i.name === key).cost * props.currentSale[key];
    });
    setSubtotal(subt);
    setGrandtotal(subt);
    if (discount !== 0) {
      setGrandtotal(subt - (subt * Number(discount)) / 100);
    }
    if (extracharges !== 0) {
      setGrandtotal(subt + extracharges);
    }
  };
  const handleDiscount = (e) => {
    setDiscount(Number(e.target.value));
    setGrandtotal(subtotal - (subtotal * Number(e.target.value)) / 100);
  };
  const handleExtraCharges = (e) => {
    setExtracharges(Number(e.target.value));
    setGrandtotal(subtotal + Number(e.target.value));
  };
  const addSale = async () => {
    const response = await axios({
      method: "post",
      url: "http://localhost:3001/addSales",
      headers: {},
      data: {
        "content": props.currentSale,
        "salestype": salestype,
        "totalbill": Number(grandtotal),
        "customerid": currcust.id,
        "name": currcust.name,
        "discount": discount===0?0:Number(discount),
        "extracharges": extracharges===0?0:Number(extracharges)
      },
    });
    console.log(response.data)
  };
  useEffect(() => {
    getCustomers();
  }, []);
  useEffect(() => {
    calculateSubtotal();
  }, [props.currentSale]);

  return (
    <>
      <div className="h-[99%] w-full border-l-2 border-black border-opacity-15 flex flex-col justify-center items-center">
        <div className="w-full h-[10%] text-3xl italic text-center flex justify-center items-center">
          <div>Bill Details</div>
        </div>
        <div className="w-full h-[12%] flex flex-col items-center justify-evenly">
          <label className="w-[95%] text-left text-lg">Customer Name</label>
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
        <div className="w-[95%] h-[5%] border-b-2 flex flex-row items-center justify-evenly">
          <div className="w-[70%] h-full flex justify-center items-center ">
            Balance:{" "}
          </div>
          <div className="w-[28%] h-full flex justify-center items-center">
            <FontAwesomeIcon className="opacity-15" icon={faIndianRupeeSign} />
            {currcust.balance}
          </div>
        </div>
        <div className="w-full h-[73%]">
          <div className="w-full h-[60%] flex flex-col items-center justify-start overflow-auto">
            {Object.keys(props.currentSale).map((itemkey) => {
              return (
                <>
                  <div className="w-[95%] h-[20%] border-b-2">
                    <div className="w-full h-1/2 flex justify-evenly items-center">
                      <div className="text-lg">{itemkey}</div>
                      <div className="text-g opacity-50">
                        price:{" "}
                        {props.items.find((i) => i.name === itemkey).cost}
                      </div>
                    </div>
                    <div className="w-full h-1/2 flex justify-evenly items-center opacity-80">
                      Quantity: {props.currentSale[itemkey]}
                      <FontAwesomeIcon
                        icon={faMinusSquare}
                        style={{ color: "#50df84", height: "60%" }}
                        onClick={() => {
                          if (props.currentSale[itemkey] === 1) {
                            let copy = { ...props.currentSale };
                            delete copy[itemkey];
                            props.setCurrentSale({
                              ...copy,
                            });
                          } else {
                            props.setCurrentSale({
                              ...props.currentSale,
                              [itemkey]: props.currentSale[itemkey] - 1,
                            });
                          }
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        style={{ color: "#50df84", height: "60%" }}
                        onClick={() => {
                          props.setCurrentSale({
                            ...props.currentSale,
                            [itemkey]: props.currentSale[itemkey] + 1,
                          });
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-full h-[20%] border-2 flex flex-col items-center justify-evenly">
            <div className="w-full h-1/3">Subtotal: {subtotal}</div>
            <div className="w-full h-1/3">
              Discount:
              <input
                className="border-2 rounded-lg w-[70%] ml-2 text-center"
                placeholder="Enter Discount in Percentage"
                type="number"
                value={discount}
                min="0"
                onChange={(e) => {
                  handleDiscount(e);
                }}
              />{" "}
            </div>
            <div className="w-full h-1/3">
              Extra Charges:
              <input
                type="number"
                className="border-2 rounded-lg w-[60%] text-center ml-2"
                placeholder="Enter any Extra Charges"
                min="0"
                value={extracharges}
                onChange={(e) => {
                  handleExtraCharges(e);
                }}
              />
            </div>
          </div>
          <div className="w-full h-[20%] border-2">
            <div className="w-full h-1/3">Grand Total: {grandtotal}</div>
            <div className="w-full h-2/3 flex flex-row">
              <div className="h-full w-1/2 flex justify-center items-center">
                Sales Type:
                <select value={salestype} onChange={(e)=>{
                  setSalestype(e.target.value);
                }}>
                  <option value="credit">Credit</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="h-full w-1/2 flex justify-center items-center">
                <button
                  className="w-full h-1/2 bg-[#50df84] rounded-lg"
                  onClick={()=>{addSale()}}
                >
                  Complete Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillDetails;
