import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVideos, loadingHandler } from "../redux/fetch";
import { pageFlagReset } from "../redux/utils";

const ShopThumbnail = (props) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/shop/${props.channelId}`}
      onClick={() => {
        window.scrollTo(0, 0);
        dispatch(loadingHandler());
        dispatch(pageFlagReset());
        dispatch(fetchVideos(props.channelId));
      }}
      className="text-center text-2xl font-bold"
    >
      <img
        src={props.thumbnail}
        className="w-full border-8 border-gray-50"
        alt="shop thumbnail"
      />
      <h1 className="bg-gray-50 p-4 w-full mx-auto text-gray-700 text-xl md:text-3xl uppercase">
        {props.name}
      </h1>
    </Link>
  );
};

export default ShopThumbnail;
