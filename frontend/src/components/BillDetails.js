import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faMinusSquare,
  faPlusSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const BillDetails = (props) => {
  const [Customers, setCustomers] = useState([]);
  const [custOptions, setcustOptions] = useState([]);
  const [currcust, setCurrcust] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discountvalue, setDiscountvalue] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [extracharges, setExtracharges] = useState(0);
  const [salestype, setSalestype] = useState("paid");
  const [paymenttype, setPaymenttype] = useState("cash");
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

  const handleDiscount = (e) => {
    setDiscount(Number(e.target.value));
  };
  const handleExtraCharges = (e) => {
    setExtracharges(Number(e.target.value));
  };
  const addSale = async () => {
    try {
      if (props.currentSale.length === 0) throw new Error("Sale not added");
      if (salestype === "") throw new Error("Sale Type not set");
      if (currcust.id === undefined) throw new Error("Customer not added");
      const postData = {
        content: props.currentSale,
        salestype: salestype,
        paymenttype: salestype !== "paid" ? "" : paymenttype,
        totalBill: Number(grandtotal),
        customerid: currcust.id,
        name: currcust.name,
        discount: discount === 0 ? 0 : Number(discount),
        extracharges: extracharges === 0 ? 0 : Number(extracharges),
      };
      console.log(postData);
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/addSales",
        headers: {},
        data: postData,
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("Sale Added Successfully");
        props.setCurrentSale([]);
        setSalestype("paid");
        setCurrcust({});
        setDiscount(0);
        setSubtotal(0);
        setPaymenttype("cash");
        setExtracharges(0);
        getCustomers();
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);
  useEffect(() => {
    const calculateSubtotal = () => {
      var subt = 0;
      props.currentSale.map((key) => {
        subt = subt + key.cost * key.quantity + key.sgstAmount + key.cgstAmount;
        return subt;
      });
      setSubtotal(subt);
    };
    calculateSubtotal();
  }, [props.currentSale, props.items]);
  useEffect(() => {
    const calculateGrandTotal = () => {
      var grandt = subtotal;
      setDiscountvalue((grandt * discount) / 100);
      grandt = grandt - (grandt * discount) / 100;
      grandt = grandt + extracharges;
      setGrandtotal(grandt);
    };
    calculateGrandTotal();
  }, [subtotal, discount, extracharges]);

  return (
    <>
      <div className="h-[120%] xl:h-full w-full border-l-2 border-black border-opacity-15 flex xl:flex-col justify-center items-center">
        <div className="xl:w-[99%] xl:h-[10%] text-3xl italic text-center flex justify-start items-center">
          <div>Bill Details</div>
        </div>
        <div className="w-[20%] xl:w-full h-1/2 xl:h-[12%] flex flex-row xl:flex-col items-center justify-evenly">
          <label className="w-[50%] xl:w-[95%] text-left text-lg">
            Customer Name
          </label>
          <Select
            options={custOptions}
            className="w-[50%] xl:w-[95%] bg-black bg-opacity-5"
            value={currcust.label}
            onChange={(selectedOption) => {
              setCurrcust(
                Customers.find((cust) => cust.id === selectedOption.value)
              );
              console.log(currcust);
            }}
          />
        </div>
        <div className="w-[20%] xl:w-[95%] h-[50%] xl:h-[5%] border-r-2 xl:border-b-2 flex flex-row items-center justify-evenly">
          <div className="w-[70%] h-full flex justify-center items-center ">
            Balance:{" "}
          </div>
          <div className="w-[28%] h-full flex justify-center items-center">
            <FontAwesomeIcon className="opacity-15" icon={faIndianRupeeSign} />
            {currcust.balance}
          </div>
        </div>
        <div className=" w-[50%] xl:w-full h-full xl:h-[73%]">
          <div className="w-full h-[20%] xl:h-[60%] flex flex-col items-center justify-start overflow-auto">
            <div className="w-[95%] h-[90%] xl:h-[10%] border-b-2 flex justify-evenly items-center">
              <div className="w-1/6 h-full text-center">Item</div>
              <div className="w-1/6 h-full text-center">Rate</div>
              <div className="w-1/6 h-full text-center">Quantity</div>
              <div className="w-1/6 h-full text-center">CGST</div>
              <div className="w-1/6 h-full text-center">SGST</div>
              <div className="w-1/6 h-full text-center">Amount</div>
            </div>
            {props.currentSale.map((sale) => {
              return (
                <>
                  <div className="w-[95%] h-[90%] xl:h-[20%] border-b-2">
                    <div className="w-full h-1/3 flex justify-evenly items-center">
                      <div className="w-1/6 text-center text-lg md:text-base sm:text-sm text-wrap">
                        {sale.name}
                      </div>
                      <div className="w-1/6 text-center text-lg md:text-base sm:text-sm text-wrap opacity-50">
                        {sale.cost}
                      </div>
                      <div className="w-1/6 text-center text-lg md:text-base sm:text-sm text-wrap opacity-50">
                        {sale.quantity}
                      </div>
                      <div className="w-1/6 text-center text-lg md:text-base sm:text-sm text-wrap opacity-50">
                        {sale.cgstAmount}
                      </div>
                      <div className="w-1/6 text-center text-lg md:text-base sm:text-sm text-wrap opacity-50">
                        {sale.sgstAmount}
                      </div>
                      <div className="w-1/6 text-center text-lg md:text-base sm:text-sm text-wrap opacity-50">
                        {sale.quantity * sale.cost +
                          sale.sgstAmount +
                          sale.cgstAmount}
                      </div>
                    </div>
                    <div className="w-full h-2/3 flex justify-evenly items-center opacity-80">
                      <FontAwesomeIcon
                        icon={faMinusSquare}
                        style={{ color: "#50df84", height: "60%" }}
                        // className="md:h-[20%] [#50df84] h-4/5"
                        onClick={() => {
                          if (sale.quantity === 1) {
                            let copy = props.currentSale.filter(
                              (item) => item.name !== sale.name
                            );
                            props.setCurrentSale([...copy]);
                          } else {
                            props.setCurrentSale(
                              props.currentSale.map((item) =>
                                item.name === sale.name
                                  ? {
                                      ...item,
                                      quantity: item.quantity - 1,
                                      cgstAmount:
                                        item.cgstAmount -
                                        (item.cost * item.cgst) / 100,
                                      sgstAmount:
                                        item.sgstAmount -
                                        (item.cost * item.sgst) / 100,
                                    }
                                  : item
                              )
                            );
                          }
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        style={{ color: "#50df84", height: "60%" }}
                        onClick={() => {
                          props.setCurrentSale(
                            props.currentSale.map((item) =>
                              item.name === sale.name
                                ? {
                                    ...item,
                                    quantity: item.quantity + 1,
                                    cgstAmount:
                                      item.cgstAmount +
                                      (item.cost * item.cgst) / 100,
                                    sgstAmount:
                                      item.sgstAmount +
                                      (item.cost * item.sgst) / 100,
                                  }
                                : item
                            )
                          );
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#50df84", height: "60%" }}
                        onClick={() => {
                          if (
                            window.confirm("Delete Item from Bill?") === true
                          ) {
                            let copy = props.currentSale.filter(
                              (item) => item.name !== sale.name
                            );
                            props.setCurrentSale([...copy]);
                          }
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-full h-[40%] xl:h-[20%] border-2 flex flex-col items-center justify-evenly sm:text-xs md:text-sm lg:text-base text-wrap">
            <div className="w-[90%] h-1/3 flex flex-row justify-between items-center">
              Subtotal: <div>{subtotal}</div>
            </div>
            <div className="w-full h-1/3 flex flex-row justify-evenly items-center truncate">
              Discount:
              <input
                className="border-2 rounded-lg w-[20%] ml-2 text-center"
                placeholder="Enter Discount in Percentage"
                type="number"
                value={discount}
                min="0"
                max="100"
                onChange={(e) => {
                  handleDiscount(e);
                }}
              />{" "}
              Discount value: {discountvalue}
            </div>
            <div className="w-[90%] h-1/3 flex flex-row justify-between items-center">
              Extra Charges:
              <input
                type="number"
                className="border-2 rounded-lg w-[30%] text-center ml-2"
                placeholder="Enter any Extra Charges"
                min="0"
                value={extracharges}
                onChange={(e) => {
                  handleExtraCharges(e);
                }}
              />
            </div>
          </div>
          <div className="w-full h-[40%] xl:h-[20%] border-2 flex flex-col items-center justify-center  sm:text-xs md:text-sm lg:text-base text-wrap">
            <div className="w-[90%] h-1/3 flex justify-between items-center">
              Grand Total: <div>{grandtotal}</div>
            </div>
            <div className="w-full h-2/3 flex flex-row">
              <div className="w-1/2 h-full flex flex-col items-center justify-evenly">
                <div className="h-1/2 w-full flex justify-center items-center">
                  Sales Type:
                  <select
                    value={salestype}
                    onChange={(e) => {
                      setSalestype(e.target.value);
                    }}
                  >
                    <option value="credit">Credit</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                {salestype === "paid" ? (
                  <div className="h-1/2 w-full flex justify-center items-center">
                    Payment Type:
                    <select
                      value={paymenttype}
                      onChange={(e) => {
                        setPaymenttype(e.target.value);
                      }}
                    >
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="h-full w-1/2 flex justify-center items-center">
                <button
                  className="w-full h-1/2 bg-[#50df84] bg-opacity-70 text-white transition-all duration-200 ease-in-out hover:bg-opacity-100 hover:text-green-900 rounded-lg"
                  onClick={() => {
                    addSale();
                  }}
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
