import React from "react";
import HeroImg from "./img/hero.jpeg";

const Hero = () => {
  return (
    <article className="p-4 lg:mt-16 pb-0 max-w-screen-xl mx-auto">
      <figure className="lg:relative">
        <img src={HeroImg} className="w-full max-h-full" alt="Hero cover" />
        <figcaption className="lg:absolute justify-end right-0 bottom-0 lg:bg-black lg:p-4">
          <h1 className="text-6xl mt-4 lg:mt-0 md:text-8xl font-bold text-black lg:text-gray-100">
            Welcome to RecordBAG
          </h1>
          <h2 className="text-4xl mb-8 mt-2 lg:text-gray-200 lg:text-right">
            Your digital digging platform
          </h2>
        </figcaption>
      </figure>
      <section className="bg-black text-gray-50 mt-4 lg:mt-0 p-4 text-2xl leading-9 sm:text-2xl lg:text-3xl">
        <p>
          Welcome to RecordBag, where all your favourite records live! It
          doesn't matter if you're a professional deejay or just an amateur disk
          jokey, RecordBag is a perfect tool for whoever loves music and just
          what you need to start creating your own digital library!
          Incorporating features from Youtube and Discogs, RecordBag is the
          perfect place to create your new set, explore new hot records and find
          the cheapest offer on that record you've been looking for all along.
        </p>
      </section>
    </article>
  );
};

export default Hero;
