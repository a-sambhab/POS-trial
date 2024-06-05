import React from 'react'
import ItemsBought from './ItemsBought';

const SalesRow = (props) => {
    return (
      <>
        <div className="h-[7.5%] w-full bg-white border-b-2 flex flex-row justify-evenly items-center text-gray-600 truncate">
          <div className="w-[12.5%] h-[90%] text-wrap flex justify-center items-center truncate">{props.data.salesID}</div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center truncate">{props.data.customerID}</div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center text-sm truncate">{new Date(props.data.date).toLocaleString()}</div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center truncate">{props.data.salestype}</div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center"><ItemsBought
            items = {props.data.content}
          /></div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center truncate">{props.data.discount}</div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center truncate">{props.data.extracharges}</div>
          <div className="w-[12.5%] h-[90%] border-l-2 text-wrap flex justify-center items-center truncate">{props.data.totalBill}</div>
        </div>
      </>
    );
  };

export default SalesRow