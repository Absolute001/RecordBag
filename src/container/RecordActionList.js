import React from "react";
import hotRecord from "../components/img/hotRecord.png";
import addToCollection from "../components/img/addToCollection.png";
import inTheCollection from "../components/img/inTheCollection.png";
import appFirebase from "../firebase/firebase";
import { handleCollection } from "../redux/currentUser";
import { useSelector, useDispatch } from "react-redux";
import firebase from "firebase/app";
import { clickAddHandler, clickHotRecordHandler } from "../redux/utils";
import { useParams } from "react-router-dom";
import ActionsButton from "../components/ActionsButton";

const RecordActionList = () => {
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
    <>
      <ActionsButton
        icon={hotRecord}
        alt="Tell other users this record is hot"
        clicked={clicked.hotRecord}
        role="Hot!"
        onClick={(event) => {
          dispatch(clickHotRecordHandler(true));
          setTimeout(() => {
            dispatch(clickHotRecordHandler(false));
          }, 400);
        }}
      />
      <ActionsButton
        icon={isInCollection ? inTheCollection : addToCollection}
        alt="Add To Your Collection"
        role={isInCollection ? "Remove" : "Add"}
        clicked={clicked.add}
        onClick={(event) => {
          if (isInCollection) {
            handleRemoveCollection();
          } else {
            handleAddCollection();
          }
          dispatch(clickAddHandler(true));
          setTimeout(() => {
            dispatch(clickAddHandler(false));
          }, 400);
        }}
      />
    </>
  );
};

export default RecordActionList;
