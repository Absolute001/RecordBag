/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Iframe from "react-iframe";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import ActionsMenu from "../components/ActionsMenu";
import BackButton from "../components/BackButton";
import DiscogsResults from "../components/DiscogsResults";
import { fetchVideoFromParams, fetchDiscogs } from "../redux/fetch";
import CollectionButton from "../components/CollectionButton";

const YoutubePlayer = () => {
  const playingVideo = useSelector((state) => state.globalState.playingVideo);
  const loading = useSelector((state) => state.globalState.loading);
  const discogsRecord = useSelector((state) => state.globalState.discogsRes);
  const currentUser = useSelector((state) => state.currentUser.user);
  const { channelId } = useParams();
  const { videoId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (playingVideo === "") {
      dispatch(fetchVideoFromParams(videoId));
    } else if (playingVideo !== "") {
      dispatch(fetchDiscogs(playingVideo.title));
    }
  }, [playingVideo]);

  return loading ? (
    <Loading />
  ) : (
    <section className="max-w-screen-xl mx-auto p-4 h-auto">
      <div>
        <BackButton path={`/shop/${channelId}`} />
        {currentUser && <CollectionButton path={`/collection`} />}
      </div>

      <div className="w-full bg-black">
        <Iframe
          url={`http://www.youtube.com/embed/${playingVideo.videoId}?rel=0`}
          className="my-4 w-full h-72 sm:h-96 mx-auto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="border-b border-black flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-4/6">
          <h1
            className="text-4xl font-bold"
            dangerouslySetInnerHTML={{ __html: playingVideo.title }}
          ></h1>
          <p
            className="my-8 text-xl"
            dangerouslySetInnerHTML={{ __html: playingVideo.description }}
          ></p>
        </div>
        {currentUser ? (
          <ActionsMenu />
        ) : (
          <h1 className="text-xl font-bold mx-auto mb-4">
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>{" "}
            or{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>{" "}
            to put this amazing record in your bag!
          </h1>
        )}
      </div>
      {discogsRecord && discogsRecord.results.length !== 0 ? (
        <DiscogsResults
          cover={discogsRecord.results[0].cover_image}
          title={discogsRecord.results[0].title}
          country={discogsRecord.results[0].country}
          year={discogsRecord.results[0].year}
          format={discogsRecord.results[0].format}
          label={discogsRecord.results[0].label}
          genre={discogsRecord.results[0].genre}
          uri={discogsRecord.results[0].uri}
        />
      ) : (
        <div className="flex h-40 text-center">
          <p className="my-auto mx-auto uppercase text-xl">
            We can't find this beast we're sorry
          </p>
        </div>
      )}
    </section>
  );
};

export default YoutubePlayer;
