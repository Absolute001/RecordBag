import React from "react";
import Iframe from "react-iframe";
import {Link} from "react-router-dom";
import ActionsMenu from "../components/ActionsMenu";

const Player = (props) => {
  return (
    <div>
      <div className="w-full bg-black">
        <Iframe
          url={`http://www.youtube.com/embed/${props.playingVideo}?rel=0`}
          className="my-4 w-full h-72 sm:h-96 mx-auto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="border-b border-black flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-4/6">
          <h1
            className="text-4xl font-bold"
            dangerouslySetInnerHTML={{ __html: props.title }}
          ></h1>
          <p
            className="my-8 text-xl"
            dangerouslySetInnerHTML={{ __html: props.description }}
          ></p>
        </div>
        {props.isLogged ? (
          <ActionsMenu />
        ) : (
          <h1 className="text-xl font-bold mx-auto mb-4">
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>{" "}
            or{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>{" "}
            to put this amazing record in your bag!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Player;
