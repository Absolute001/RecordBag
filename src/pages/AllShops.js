/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import ShopThumbnail from "../components/ShopThumbnail";
import { fetchChannel } from "../redux/fetch";
import { handleUser } from "../redux/currentUser";
import appFirebase from "../firebase/firebase";

const AllShops = () => {
  const channels = useSelector((state) => state.globalState.channel);
  const loading = useSelector((state) => state.globalState.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    appFirebase.auth().onAuthStateChanged((user) => {
      dispatch(handleUser(user));
    });
    if (channels.length === 0) {
      dispatch(fetchChannel());
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section className="p-4 pt-0 mb-4 lg:mb-24 max-w-screen-xl mx-auto">
      <div className="border-b-2 lg:mt-8 border-black w-full">
        <h1 className="text-white bg-black text-center p-4 lg:text-8xl text-5xl font-bold">
          SHOPS
        </h1>
      </div>
      <div className="grid grid-cols-2 md:justify-evenly my-auto bg-black">
        {channels.map((channel, index) => (
            <ShopThumbnail
              key={index}
              channelId={channel.id}
              name={channel.snippet.title}
              thumbnail={channel.snippet.thumbnails.high.url}
            />
        ))}
      </div>
    </section>
  );
};

export default AllShops;
