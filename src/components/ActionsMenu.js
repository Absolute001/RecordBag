import React from "react";
import hotRecord from "../components/img/hotRecord.png";
import addToCollection from "../components/img/addToCollection.png";
import inTheCollection from "../components/img/inTheCollection.png";
import appFirebase from "../firebase/firebase";
import { handleCollection } from "../redux/currentUser";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import { clickHandler } from "../redux/utils";
import { useParams } from "react-router-dom";

const ActionsMenu = () => {
  const { videoId } = useParams();
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const clicked = useSelector((state) => state.utilState.clicked);
  const user = useSelector((state) => state.currentUser.user);
  const collection = useSelector((state) => state.currentUser.collection);
  const isInCollection = collection.some((record) => record.video === videoId);
  const thumbnailUrl = useSelector(
    (state) => state.globalState.playingVideo.thumbnail
  );
  const recordTitle = useSelector(
    (state) => state.globalState.playingVideo.title
  );

  /*   const collectionTrace = async () => {
    const 
    await docRef;
  }; */

  const handleAddCollection = async () => {
    const db = appFirebase.firestore();
    const docRef = db.collection("users").doc(user.email);
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
      await docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          dispatch(handleCollection(data.likedRecords));
          console.log(collection);
        }
      });
      console.log("add");
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemoveCollection = async () => {
    const db = appFirebase.firestore();
    const docRef = db.collection("users").doc(user.email);
    try {
      await db
        .collection("users")
        .doc(user.email)
        .update({
          likedRecords: firebase.firestore.FieldValue.arrayRemove({
            channel: channelId,
            video: videoId,
            thumbnail: thumbnailUrl,
            title: recordTitle,
          }),
        });
      await docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          dispatch(handleCollection(data.likedRecords));
          console.log(collection);
        }
      });
      console.log("remove");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <nav className="flex p-4 text-6xl max-w-xs justify-center mx-auto my-auto">
      <img
        onClick={(e) => {
          e.preventDefault();
          alert("This functionality is coming soon...");
        }}
        src={hotRecord}
        className="my-auto w-12 h-12 mr-4 cursor-pointer lg:transform transition-transform duration-500 lg:hover:-translate-y-2 "
        alt="Tell other users that this record is hot"
      />
      <img
        onClick={() => {
          if (isInCollection) {
            handleRemoveCollection();
          } else {
            handleAddCollection();
          }
          dispatch(clickHandler(true));
          setTimeout(() => {
            dispatch(clickHandler(false));
          }, 400);
        }}
        src={isInCollection ? inTheCollection : addToCollection}
        className={`w-16 mr-4 cursor-pointer lg:transform transition-transform duration-500 lg:hover:-translate-y-2 rounded-full ${
          clicked && "animate animate-ping"
        }`}
        alt="Add to your personal collection"
      />
    </nav>
  );
};

export default ActionsMenu;
