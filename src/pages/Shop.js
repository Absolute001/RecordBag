/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchChannel, fetchPageHandler, fetchVideos } from "../redux/fetch";
import { pageFlagHandler } from "../redux/utils";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useParams, Link } from "react-router-dom";
import HomeIcon from "../components/img/home icon.png";
import Bag from "../components/img/Logo.png";
import Records from "../components/Records";
import Loading from "../components/Loading";
import NavButton from "../components/NavButton";

const Shop = () => {
  const { channelId } = useParams();

  const videos = useSelector((state) => state.globalState.shopVideos);
  const pageFlag = useSelector((state) => state.utilState.pageFlag);
  const loading = useSelector((state) => state.globalState.loading);
  const channels = useSelector((state) => state.globalState.channel);
  const currentUser = useSelector((state) => state.currentUser.user);
  const currentChannel = channels.filter((channel) => channel.id === channelId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(fetchChannel());
      dispatch(fetchVideos(channelId));
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <article className="p-4 max-w-screen-xl mx-auto min-h-screen">
      {/*  BACK BUTTON */}

      <nav className="flex justify-items-start">
        <NavButton path="/" role="HOME" icon={HomeIcon} />
        {currentUser && (
          <NavButton role="COLLECTION" icon={Bag} path={`/collection`} />
        )}
      </nav>

      <section className="bg-black w-full h-32 sm:h-48 flex mb-4">
        <figure className="h-full flex mx-auto sm:mx-0 sm:ml-8 p-4">
          {currentChannel.length !== 0 && (
            <>
              <img
                src={currentChannel[0].thumbnail}
                className="w-20 sm:h-36 sm:w-36 rounded-full my-auto mx-auto border-4 border-gray-50"
                alt="shop thumbnail"
              />
              <h1 className="text-white ml-8 font-bold my-auto text-2xl sm:text-6xl uppercase">
                {currentChannel[0].title} Shop
              </h1>
            </>
          )}
        </figure>
      </section>

      {/* ------ */}

      <div className="border-b-2 mb-4 border-black w-full">
        <h1 className="p-1  text-4xl">Dig some records</h1>
      </div>

      {/*  VIDEO PREVIEW COMPONENT*/}
      <section className="flex flex-col md:grid grid-cols-2">
        {videos.length !== 0 &&
          videos[0].items.map((video, index) => (
            <Link
              className="mx-2 my-4 "
              key={video.id.videoId}
              to={`/shop/${channelId}/player/${video.id.videoId}`}
            >
              <Records
                videoId={video.id.videoId}
                key={index}
                thumbnail={video.snippet.thumbnails.default.url}
                title={video.snippet.title}
                description={video.snippet.description}
              />
            </Link>
          ))}
      </section>

      {/*   NAVIGATION MENU */}

      <nav className="text-4xl flex flex-col max-w-screen-sm mt-4 mx-auto">
        <div className="mx-auto flex">
          {pageFlag > 1 && (
            <MdNavigateBefore
              className="my-auto cursor-pointer"
              onClick={() => {
                dispatch(
                  fetchPageHandler(
                    videos[0].items[0].snippet.channelId,
                    videos[0].prevPageToken
                  )
                );
                dispatch(pageFlagHandler(-1));
                window.scrollTo(0, 0);
              }}
            />
          )}
          <h1 className="text-2xl px-2 text-black">{pageFlag}</h1>
          {videos.length !== 0 && videos[0].nextPageToken && (
            <MdNavigateNext
              className="my-auto cursor-pointer"
              onClick={() => {
                dispatch(
                  fetchPageHandler(
                    videos[0].items[0].snippet.channelId,
                    videos[0].nextPageToken
                  )
                );
                dispatch(pageFlagHandler(+1));
                window.scrollTo(0, 0);
              }}
            />
          )}
        </div>
      </nav>

      {/* END OF SECTION */}
    </article>
  );
};
export default Shop;
