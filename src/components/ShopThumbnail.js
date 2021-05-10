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
      className=" text-center text-2xl font-bold"
    >
      <img
        src={props.thumbnail}
        className="mx-auto h-42 w-full md:w-3/6 border-8 border-gray-50"
        alt="shop thumbnail"
      />
      <h1 className="bg-gray-50 p-4 md:w-3/6 mx-auto text-black text-3xl uppercase">
        {props.name}
      </h1>
    </Link>
  );
};

export default ShopThumbnail;
