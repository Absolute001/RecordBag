/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ShopThumbnail from "../components/ShopThumbnail";
import Slider from "react-slick";
import Hero from "../components/Hero";
import { fetchChannel } from "../redux/fetch";
import { useSelector, useDispatch } from "react-redux";

const AllShops = () => {
  const carouselSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    lazyLoad: true,
  };
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.globalState.channel);
  useEffect(() => {
    if (channels.length === 0) {
      dispatch(fetchChannel());
    }
  }, []);

  return (
    <>
      <Hero />
      <section className="lg:mt-16 p-4 max-w-screen-xl mx-auto">
        <div className="bg-black">
          <h1 className="text-center text-white lg:text-6xl text-4xl pt-4 font-bold">
            SHOPS
          </h1>
          {/* SHOP CAROUSEL */}
          <div className="lg:mb-16 p-8 xl:px-48 pb-16">
            <Slider className="md:w-3/6 mx-auto" {...carouselSettings}>
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
    </>
  );
};

export default AllShops;
