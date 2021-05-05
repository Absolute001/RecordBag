import React, { useEffect } from "react";
import ShopVideo from "../components/ShopVideo";
import { handleCollection } from "../redux/currentUser";
import appFirebase from "../firebase/firebase";
import "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { loadingHandler } from "../redux/fetch";
import { Link } from "react-router-dom";

const Collection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser.user);
  const collection = useSelector((state) => state.currentUser.collection);
  const docRef = appFirebase.firestore().collection("users").doc(user.email);
  const loading = useSelector((state) => state.globalState.loading);

  useEffect(() => {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          console.log(data);
          dispatch(handleCollection(data.likedRecords));
          dispatch(loadingHandler(false));
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="p-4 mb-4 lg:mb-24 max-w-screen-xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-xl font-bold">{user.displayName}</h1>
          {collection.map((record, index) => (
            <Link to={`/shop/${record.channel}/player/${record.video}`}>
              <ShopVideo
                channel={record.channel}
                id={index}
                videoId={record.video}
                title={record.title}
                thumbnail={record.thumbnail}
              />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Collection;
