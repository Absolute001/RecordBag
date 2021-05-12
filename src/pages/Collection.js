import React, { useEffect } from "react";
import ShopVideo from "../components/ShopVideo";
import { handleCollection } from "../redux/currentUser";
import appFirebase from "../firebase/firebase";
import "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { loadingHandler } from "../redux/fetch";
import { Link, useHistory } from "react-router-dom";

const Collection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser.user);
  const collection = useSelector((state) => state.currentUser.collection);
  const loading = useSelector((state) => state.globalState.loading);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    appFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const docRef = appFirebase.firestore().collection("users").doc(user.email);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              const data = doc.data();
              console.log(data);
              dispatch(handleCollection(data.likedRecords.reverse()));
              dispatch(loadingHandler(false));
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        dispatch(loadingHandler(false));
        history.push("/login");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

 

  return (
    <section className="p-4 mb-4 lg:mb-24 max-w-screen-xl mx-auto">
      {loading ? (
        <Loading />
      ) : (
        user && (
          <div>
            {/* user account section */}

            <div className="flex">
              <input type="file" id="uploadPic" name="uploadPic" />
              <h1 className="text-xl font-bold p-2">{user.displayName}</h1>
            </div>

            {collection.map((record, index) => (
              <Link
                key={record.video}
                to={`/shop/${record.channel}/player/${record.video}`}
              >
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
        )
      )}
    </section>
  );
};

export default Collection;
