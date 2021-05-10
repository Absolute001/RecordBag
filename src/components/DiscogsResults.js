import React from "react";

const DiscogsResults = (props) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl my-12"> Here you can find this hottie:</h1>
      <div className="flex flex-col md:flex-row border-black border-2 p-4 mb-12">
        <img
          className="w-40 h-40 clip-path mx-auto"
          src={props.cover}
          alt="Record Cover"
        />
        <div className="flex flex-col w-full md:grid md:grid-cols-3 text-xl lg:text-2xl text-center items-center px-4">
          <h1>
            <span className="font-bold">Title:</span> {props.title}
          </h1>
          <p>
            <span className="font-bold">Country:</span> {props.country}
          </p>
          <p>
            <span className="font-bold">Year:</span> {props.year}
          </p>
          <p>
            <span className="font-bold">Format:</span>{" "}
            {props.format.map((element) => `${element} `)}
          </p>
          <p>
            <span className="font-bold">Label:</span>{" "}
            {props.label.map((element) => `${element} `)}
          </p>
          <p>
            <span className="font-bold">Genre:</span>{" "}
            {props.genre.map((element) => `${element} `)}
          </p>
          <a
            href={`https://discogs.com${props.uri}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 font-bold lg:hover:text-blue-600 col-start-2 col-end-3"
          >
            Buy Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default DiscogsResults;
