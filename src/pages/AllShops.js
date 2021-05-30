/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ShopThumbnail from "../components/ShopThumbnail";
import Hero from "../components/Hero";
import HotRecordsContainer from "../container/HotRecordsContainer";

const AllShops = (props) => {
  return (
    <main>
      <Hero />
      <article className="lg:mt-16 p-4 max-w-screen-xl mx-auto">
        <section
          className="p-4 grid grid-cols-2
           sm:grid-cols-3 gap-x-2 gap-y-4
           bg-black
           "
        >
          <h1
            className="text-white text-xl
            md:text-3xl text-left
          col-start-1 col-end-3
          md:col-start-1 md:col-end-2
          lg:text-6xl uppercase p-4 my-auto font-bold"
          >
            These are the available shops, dig in them and start your huge
            collection
          </h1>
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
          <q
            className="text-white text-right
           text-lg md:text-3xl lg:text-5xl
           col-start-1 col-end-3
           md:col-start-3 md:col-end-4
           uppercase p-4 my-auto"
          >
            My job is to be a DJ and make people dance so if people dance, I've
            done my job. - Jeff Mills
          </q>
        </section>
      </article>
      <HotRecordsContainer />
    </main>
  );
};

export default AllShops;
