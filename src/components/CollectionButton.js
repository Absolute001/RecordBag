import React from "react";
import { Link } from "react-router-dom";
import Bag from "../components/img/Logo.png";

const CollectionButton = (props) => {
  return (
    <button className="my-4 invert-svg border-2 border-black ml-3 sm:ml-4 lg:hover:bg-gray-600 lg:hover:text-white lg:transform transition-transform duration-500 lg:hover:-translate-y-2">
      <Link to={props.path} className="flex p-2 uppercase items-end">
        <img src={Bag} className="w-8 mr-1" alt="bag logo" />
        <h1 className="text-2xl">Collection</h1>
      </Link>
    </button>
  );
};

export default CollectionButton;
