import React from "react";

const ActionsButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`mx-4 outline-none
       lg:transform transition-transform 
      duration-500 focus:outline-none lg:hover:-translate-y-2
        ${props.clicked && "animate animate-ping"}`}
    >
      <img src={props.icon} alt={props.alt} className="h-12 w-12 mx-auto" />
      <h1 className="text-sm p-2">{props.role}</h1>
    </button>
  );
};

export default ActionsButton;
