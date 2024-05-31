import React, { useEffect, useState } from "react";
// import { NavLink, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBottleWater,
  faEgg,
  faLeaf,
  faMugHot,
  faSearch,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Categories from "../components/Categories";
import MenuItem from "../components/MenuItem";
import BillDetails from "../components/BillDetails";

const Landing = () => {
  const [searchquery, setSearchquery] = useState("");
  const [category, setCategory] = useState("all");
  const [itemcount, setItemcount] = useState(30);
  const [allitems, setAllitems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentSale, setCurrentSale] = useState({});
  const getallitems = async () => {
    const response = await axios.get("http://localhost:3001/getItems");
    setAllitems(response.data.items);
    setItemcount(response.data.items.length);
  };
  useEffect(() => {
    getallitems();
  }, []);
  useEffect(() => {
    var filtername = allitems;
    if (searchquery !== "") {
      filtername = allitems.filter((item) =>
        item.name.toLowerCase().includes(searchquery.toLowerCase())
      );
      console.log(filtername);
    }
    var filtercategory = filtername;
    if (category !== "all") {
      filtercategory = filtername.filter((item) => item.group === category);
      console.log(filtercategory);
    }
    setFilteredItems(filtercategory);
    setItemcount(filtercategory.length);
  }, [searchquery, category, allitems]);

  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-evenly items-center">
        <Navbar />
        <div className="h-full w-[63%]">
          <div className="h-[13%] w-full flex justify-center items-center">
            <div className="h-full w-[99%] border-b-2 border-black border-opacity-15 flex justify-center items-center">
              <div className="search h-1/2 w-[50%] bg-black bg-opacity-[0.01] flex justify-evenly items-center border-2 border-black border-opacity-5 rounded-lg">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ height: "80%", width: "5%", opacity: "0.4" }}
                />
                <input
                  className="bg-black bg-opacity-[0.001] w-[90%]"
                  value={searchquery}
                  onChange={(e) => {
                    setSearchquery(e.target.value);
                    console.log(e.target.value);
                  }}
                  placeholder="Search menu"
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[27%] flex flex-col justify-evenly items-center bg-black bg-opacity-[0.01]">
            <div className="w-full h-[30%] text-left text-3xl italic pl-[1%]">
              Categories
            </div>
            <div className="w-full h-[65%] flex flex-row justify-start items-center">
              <Categories
                icon={faUtensils}
                name="All"
                value="all"
                setCategory={setCategory}
                category={category}
              />
              <Categories
                icon={faLeaf}
                name="Veg"
                value="veg"
                setCategory={setCategory}
                category={category}
              />
              <Categories
                icon={faEgg}
                name="Non-Veg"
                value="nonveg"
                setCategory={setCategory}
                category={category}
              />
              <Categories
                icon={faMugHot}
                name="Hot Drinks"
                value="hotdrinks"
                setCategory={setCategory}
                category={category}
              />
              <Categories
                icon={faBottleWater}
                name="Cold Drinks"
                value="colddrinks"
                setCategory={setCategory}
                category={category}
              />
            </div>
          </div>
          <div className="w-full h-[60%] flex flex-col justify-evenly items-center bg-black bg-opacity-[0.01]">
            <div className="w-full h-[12.5%] flex flex-row">
              <div className="w-[80%] h-full text-left text-3xl italic pl-[1%] flex items-center">
                Select Items
              </div>
              <div className="w-[20%] h-full text-left text-xl italic pl-[1%] flex justify-center items-center opacity-80">
                Showing {itemcount} items
              </div>
            </div>
            <div className="w-full h-[80%] flex flex-row flex-wrap justify-center items-center overflow-auto">
              {filteredItems.map((item) => {
                return (
                  <>
                    <MenuItem
                      item={item}
                      currentSale={currentSale}
                      setCurrentSale={setCurrentSale}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-full w-[22%] flex flex-col justify-center items-center">
          <BillDetails/>
        </div>
      </div>
    </>
  );
};

export default Landing;
