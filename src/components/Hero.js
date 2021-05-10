import React from "react";
import HeroImg from "./img/hero.jpeg";

const Hero = () => {
  return (
    <section className="p-4 mt-4 lg:mt-16 pb-0 max-w-screen-xl mx-auto">
      <div className="lg:relative">
        <img
          src={HeroImg}
          className="w-full max-h-full"
          alt="Hero cover"
        />
        <div className="lg:absolute right-0 bottom-0 lg:bg-black lg:p-4">
          <h1 className="text-6xl mt-4 lg:mt-0 md:text-8xl font-bold text-black lg:text-gray-100">
            Welcome to RecordBAG
          </h1>
          <h2 className="text-4xl mb-8 mt-2 lg:text-gray-200 lg:text-right">
            Your digital digging platform
          </h2>
        </div>
      </div>
      <div className="bg-black text-gray-50 mt-4 lg:mt-0 p-4 text-xl sm:text-2xl">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          quas, a repudiandae nulla magni magnam eveniet itaque distinctio
          exercitationem sed quo minima aliquam expedita? Aliquam accusantium ex
          magnam nulla vero saepe voluptatibus aut expedita vel quod! Enim odit,
          totam, itaque at qui, nostrum deleniti praesentium beatae ut
          voluptatibus consequatur fuga.
        </p>
      </div>
    </section>
  );
};

export default Hero;
