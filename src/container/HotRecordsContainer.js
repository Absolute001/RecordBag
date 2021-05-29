/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotRecords } from "../redux/hotRecords";
import { Link } from "react-router-dom";
import Records from "../components/Records";

const HotRecordsContainer = () => {
  const hotRecords = useSelector((state) => state.hotRecordsState.hotRecords);
  const dispatch = useDispatch();
  useEffect(() => {
    if (hotRecords.length === 0) {
      dispatch(fetchHotRecords());
    }
  }, []);

  return (
    <section className="mx-auto max-w-screen-xl m-4 p-4">
      <h1 className="font-bold text-4xl border-b-2 pb-2 border-black">
        Hot Records{" "}
        <span role="img" aria-label="sheep">
          🔥
        </span>
        <span className="text-lg"> - Users' Top 10 </span>
      </h1>
      <div className="flex flex-col sm:grid grid-cols-2 mt-2">
        {hotRecords.map((record, index) => (
          <Link
            className="mx-2 my-4"
            key={record.video}
            to={`/shop/${record.channel}/player/${record.video}`}
          >
            <Records
              videoId={record.video}
              key={index}
              thumbnail={record.thumbnail}
              title={record.title}
              description={record.description}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HotRecordsContainer;
