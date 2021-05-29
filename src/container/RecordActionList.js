import React from "react";
import addToCollection from "../components/img/addToCollection.png";
import inTheCollection from "../components/img/inTheCollection.png";
import appFirebase from "../firebase/firebase";
import { handleCollection } from "../redux/currentUser";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import { clickHandler } from "../redux/utils";
import { useParams } from "react-router-dom";
import ActionsButton from "../components/ActionsButton";

const RecordActionList = (props) => {
  const { videoId } = useParams();
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const clicked = useSelector((state) => state.utilState.clicked);
  const user = useSelector((state) => state.currentUser.user);
  const collection = useSelector((state) => state.currentUser.collection);
  const isInCollection =
    collection && collection.some((record) => record.video === videoId);
  const thumbnailUrl = useSelector(
    (state) => state.globalState.playingVideo.thumbnail
  );
  const recordTitle = useSelector(
    (state) => state.globalState.playingVideo.title
  );

  const handleAddRemove = async (action) => {
    const db = appFirebase.firestore();
    const docRef = db.collection("users").doc(user.email);
    const hotRecRef = db.collection("hotRecords").doc(videoId);
    if (action === "add") {
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
        await hotRecRef.get().then((doc) => {
          if (!doc.exists) {
            hotRecRef.set({
              channel: channelId,
              video: videoId,
              thumbnail: thumbnailUrl,
              title: recordTitle,
              likes: 1,
              description: props.description,
            });
          } else {
            hotRecRef.update({
              likes: firebase.firestore.FieldValue.increment(1),
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    } else if (action === "remove") {
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
        await hotRecRef.get().then((doc) => {
          hotRecRef.update({
            likes: firebase.firestore.FieldValue.increment(-1),
          });
        });
        console.log("remove");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <ActionsButton
        icon={isInCollection ? inTheCollection : addToCollection}
        alt="Add To Your Collection"
        role={isInCollection ? "Remove" : "Add"}
        clicked={clicked.add}
        onClick={(event) => {
          if (isInCollection) {
            handleAddRemove("remove");
          } else {
            handleAddRemove("add");
          }
          dispatch(clickHandler(true));
          setTimeout(() => {
            dispatch(clickHandler(false));
          }, 400);
        }}
      />
    </>
  );
};

export default RecordActionList;
