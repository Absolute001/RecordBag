/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import DiscogsResults from "../components/DiscogsResults";
import { fetchVideoFromParams, fetchDiscogs } from "../redux/fetch";
import CollectionButton from "../components/CollectionButton";
import Player from "../components/Player";

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
    } else if (discogsRecord === null) {
      dispatch(fetchDiscogs(playingVideo.title));
    }
  }, [playingVideo]);

  return loading ? (
    <Loading />
  ) : (
    <section className="max-w-screen-xl min-h-screen mx-auto p-4 h-auto">
      <div>
        <BackButton path={`/shop/${channelId}`} />
        {currentUser && <CollectionButton path={`/collection`} />}
      </div>

      <Player
        playingVideo={playingVideo.videoId}
        title={playingVideo.title}
        description={playingVideo.description}
        isLogged={currentUser}
      />

      {(discogsRecord.results.length === 0) | (discogsRecord.length === 0) ? (
        <div className="flex h-40 text-center">
          <p className="my-auto mx-auto uppercase text-xl">
            We can't find this beast we're sorry
          </p>
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default YoutubePlayer;
