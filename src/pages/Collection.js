import React, { useEffect } from "react";
import ShopVideo from "../components/ShopVideo";
import "firebase/firestore";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Collection = () => {
  const collection = useSelector((state) => state.currentUser.collection);
  const user = useSelector((state) => state.currentUser.user);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user === null) {
      history.push("/login");
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="p-4 mb-4 lg:mb-24 min-h-screen max-w-screen-xl mx-auto">
      {user && collection && (
        <div className="flex flex-col">
          {/* user account section */}

          <h1 className="text-xl font-bold p-2">{user.displayName}</h1>

          <div className="flex flex-col md:grid grid-cols-2">
            {collection.map((record, index) => (
              <Link
                className="md:mx-2 my-4"
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
        </div>
      )}
    </section>
  );
};

export default Collection;
