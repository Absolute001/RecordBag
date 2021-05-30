import React from "react";
import { useDispatch } from "react-redux";
import { playingVideo, fetchDiscogs } from "../redux/fetch";

const Records = (props) => {
  const dispatch = useDispatch();

  const dispatchChain = () => {
    dispatch(fetchDiscogs(props.title));
    dispatch(
      playingVideo({
        videoId: props.videoId,
        title: props.title,
        description: props.description,
        thumbnail: props.thumbnail,
      })
    );
  };

  return (
    <article
      className="h-full border-2 border-black py-2 text-black lg:hover:bg-gray-600 
    lg:hover:text-white lg:transform transition-transform duration-500 lg:hover:-translate-y-2"
    >
      <figure
        className="max-w-full my-auto flex"
        onClick={() => dispatchChain()}
      >
        <img
          src={props.thumbnail}
          alt="video thumbnail"
          className="clip-path"
        />
        <figcaption
          className=" max-h-full w-3/6 my-auto text-lg lg:text-2xl"
          dangerouslySetInnerHTML={{
            __html:
              props.title.length > 30
                ? `${props.title.substring(0, 30)}...`
                : props.title,
          }}
        ></figcaption>
      </figure>
    </article>
  );
};

export default Records;
