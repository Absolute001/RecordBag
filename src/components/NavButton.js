import React from "react";
import { Link } from "react-router-dom";

const NavButton = (props) => {
  return (
    <button
      className="my-4 border-2 border-black 
  lg:hover:bg-gray-600 lg:hover:text-white
   lg:transform transition-transform 
   duration-500 lg:hover:-translate-y-2 mr-2
   "
    >
      <Link to={props.path} className="flex p-2 uppercase mx-auto">
        <img
          src={props.icon}
          alt="button icon"
          className="my-auto mr-1"
          width="25px"
        />
        <span className="font-bold text-2xl"> {props.role}</span>
      </Link>
    </button>
  );
};

export default NavButton;
