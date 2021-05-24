import React from "react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import Record from "../components/img/vinyl.png";

const BackButton = (props) => {
  return (
    <button className="my-4 border-2 border-black 
    lg:hover:bg-gray-600 lg:hover:text-white
     lg:transform transition-transform 
     duration-500 lg:hover:-translate-y-2">
      <Link to={props.path} className="flex p-2 items-end	uppercase">
        {props.path === "/" ? (
          <MdHome className="text-3xl mr-2" />
        ) : (
          <img src={Record} className="w-7 mr-2" alt="record logo" />
        )}
        <h1 className="text-2xl">{props.path === "/" ? "Home" : "Shop"}</h1>
      </Link>
    </button>
  );
};

export default BackButton;
