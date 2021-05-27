import React from "react";
import Iframe from "react-iframe";
import { Link } from "react-router-dom";
import CopyToClip from "../components/CopyToClip";
import RecordActionList from "../container/RecordActionList";

const Player = (props) => {
  return (
    <>
      <div className="w-full bg-black">
        <Iframe
          url={`https://www.youtube.com/embed/${props.playingVideo}?rel=0`}
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
        <nav className="flex p-4 text-6xl max-w-xs justify-center mx-auto my-auto">
          {props.isLogged ? (
            <RecordActionList />
          ) : (
            <h1 className="text-xl font-bold mx-auto mb-4 mr-2">
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
          <CopyToClip />
        </nav>
      </div>
    </>
  );
};

export default Player;
