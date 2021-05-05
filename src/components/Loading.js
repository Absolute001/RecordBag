import React from "react";
import Vinyl from "./img/vinyl.png";
import recordBag from "./img/vinyls.png";

const Loading = () => {
  return (
    <div className="flex h-screen">
      <div className="my-auto mx-auto">
        <div className="flex flex-col relative">
          <img
            src={Vinyl}
            className="w-24 animate-spin absolute bottom-20"
            alt="Record"
          />
          <img src={recordBag} className="w-24" alt="Record bag" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
