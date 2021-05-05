import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideos, loadingHandler, pageFlagHandler } from "../redux/fetch";

const ShopThumbnail = (props) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/shop/${props.channelId}`}
      onClick={() => {
        window.scrollTo(0, 0);
        dispatch(loadingHandler());
        dispatch(pageFlagHandler(0));
        dispatch(fetchVideos(props.channelId));
      }}
      className=" m-4 sm:m-10 cursor-pointer text-center text-2xl font-bold lg:transform transition-transform duration-500 lg:hover:-translate-y-2"
    >
      <img
        src={props.thumbnail}
        className="mx-auto max-h-72 rounded-full mb-2 border-8 border-gray-50"
        alt="shop thumbnail"
      />
      <h1 className="bg-gray-50 lg:w-3/6 mx-auto text-black text-lg md:text-3xl uppercase">
        {props.name}
      </h1>
    </Link>
  );
};

export default ShopThumbnail;
