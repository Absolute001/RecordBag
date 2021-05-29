/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ShopThumbnail from "../components/ShopThumbnail";
import Hero from "../components/Hero";
import HotRecordsContainer from "../container/HotRecordsContainer";

const AllShops = (props) => {

  return (
    <>
      <Hero />
      <section className="lg:mt-16 max-w-screen-xl mx-auto">
        <div className="bg-black m-4">
          <h1 className="text-center text-white lg:text-6xl text-4xl pt-4 font-bold">
            SHOPS
          </h1>
          {/* SHOP CAROUSEL */}
          <div
            className="lg:mb-16 p-8 pb-16 grid grid-cols-2
           sm:grid-cols-4 gap-2
           "
          >
            {props.channels.map((channel, index) => (
              <div
                key={index}
                className="lg:transform transition-transform
               duration-500 lg:hover:-translate-y-2"
              >
                <ShopThumbnail
                  channelId={channel.id}
                  name={channel.title}
                  thumbnail={channel.thumbnail}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <HotRecordsContainer />
    </>
  );
};

export default AllShops;
