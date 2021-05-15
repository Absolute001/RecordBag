/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ShopThumbnail from "../components/ShopThumbnail";
import { fetchChannel } from "../redux/fetch";
import { handleUser } from "../redux/currentUser";
import appFirebase from "../firebase/firebase";
import Slider from "react-slick";

const AllShops = () => {
  const channels = useSelector((state) => state.globalState.channel);
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

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
  };

  return (
    <section className="lg:mt-16 p-4 max-w-screen-xl mx-auto">
      <div className="bg-black">
        <h1 className="text-center text-white lg:text-6xl text-4xl pt-4 font-bold">
          SHOPS
        </h1>
        <div className="lg:mb-16 p-8 xl:px-48 xl:pb-16 ">
          <Slider {...settings}>
            {channels.map((channel, index) => (
              <ShopThumbnail
                key={index}
                channelId={channel.id}
                name={channel.title}
                thumbnail={channel.thumbnail}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default AllShops;
