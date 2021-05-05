import React from "react";
import hotRecord from "../components/img/hotRecord.png";
import addToCollection from "../components/img/addToCollection.png";
import appFirebase from "../firebase/firebase";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import { clickHandler } from "../redux/utils";
import { useParams } from "react-router-dom";

const ActionsMenu = () => {
  const dispatch = useDispatch();
  const clicked = useSelector((state) => state.utilState.clicked);
  const user = useSelector((state) => state.currentUser.user);
  const thumbnailUrl = useSelector(
    (state) => state.globalState.playingVideo.thumbnail
  );
  const recordTitle = useSelector(
    (state) => state.globalState.playingVideo.title
  );

  const db = appFirebase.firestore();
  const { videoId } = useParams();
  const { channelId } = useParams();

  const handleAddCollection = async () => {
    try {
      await db
        .collection("users")
        .doc(user.email)
        .update({
          likedRecords: firebase.firestore.FieldValue.arrayUnion({
            channel: channelId,
            video: videoId,
            thumbnail: thumbnailUrl,
            title: recordTitle,
          }),
        });
      console.log("success");
    } catch (e) {
      console.log(db.FieldValue);
      console.log(e.message);
      console.log(user.email);
    }
  };

  return (
    <nav className="flex p-4 text-6xl max-w-xs justify-center mx-auto my-auto">
      <img
        src={hotRecord}
        className="my-auto w-12 h-12 mr-4 cursor-pointer lg:transform transition-transform duration-500 lg:hover:-translate-y-2 "
        alt="Tell other users that this record is hot"
      />
      <img
        onClick={() => {
          dispatch(clickHandler(true));
          handleAddCollection();
          setTimeout(() => {
            dispatch(clickHandler(false));
          }, 1200);
        }}
        src={addToCollection}
        className={`w-16 mr-4 cursor-pointer lg:transform transition-transform duration-500 lg:hover:-translate-y-2 ${
          clicked && "animate animate-ping"
        }`}
        alt="Add to your personal collection"
      />
    </nav>
  );
};

export default ActionsMenu;
