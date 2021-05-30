/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import DiscogsResults from "../components/DiscogsResults";
import { fetchVideoFromParams, fetchDiscogs } from "../redux/fetch";
import Player from "../components/Player";
import Bag from "../components/img/Logo.png";
import NavButton from "../components/NavButton";
import Vynil from "../components/img/vinyl.png";

const SelectedRecord = () => {
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
    } else if (discogsRecord === []) {
      dispatch(fetchDiscogs(playingVideo.title));
    }
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <article className="max-w-screen-xl min-h-screen mx-auto p-4 h-auto">
      <nav className="flex justify-items-start">
        <NavButton path={`/shop/${channelId}`} role="SHOP" icon={Vynil} />
        {currentUser && (
          <NavButton role="COLLECTION" icon={Bag} path={`/collection`} />
        )}
      </nav>

      {
        <Player
          playingVideo={playingVideo.videoId}
          title={playingVideo.title}
          description={playingVideo.description}
          isLogged={currentUser}
        />
      }

      {discogsRecord.length === 0 ? (
        <section className="flex h-40 text-center">
          <p className="my-auto mx-auto uppercase text-xl">
            We can't find this beast we're sorry
          </p>
        </section>
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
    </article>
  );
};

export default SelectedRecord;
