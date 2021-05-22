import React from "react";
import Records from "../components/Records";
import "firebase/firestore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Collection = () => {
  const collection = useSelector((state) => state.currentUser.collection);
  const user = useSelector((state) => state.currentUser.user);

  return (
    <section className="p-4 mb-4 lg:mb-24 min-h-screen max-w-screen-xl mx-auto">
      {user !== null && collection.length !== 0 && (
        <div className="flex flex-col">
          {/* user account section */}

          <h1 className="text-xl font-bold p-2">{user.displayName}</h1>

          {/*The next block renders the collection of the user */}

          <div className="flex flex-col md:grid grid-cols-2">
            {collection.reverse().map((record, index) => (
              <Link
                className="md:mx-2 my-4"
                key={record.video}
                to={`/shop/${record.channel}/player/${record.video}`}
              >
                <Records
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
