import React from "react";
import { clickClipboardHandler } from "../redux/utils";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BsLink45Deg } from "react-icons/bs";

const CopyToClip = () => {
  const clicked = useSelector((state) => state.utilState.clicked);

  const dispatch = useDispatch();
  return (
    <CopyToClipboard text={window.location.href}>
      <span
        onClick={() => {
          dispatch(clickClipboardHandler(true));
          setTimeout(() => {
            dispatch(clickClipboardHandler(false));
          }, 400);
        }}
        className={`w-12 h-12 text-center mx-4 cursor-pointer lg:transform transition-transform duration-500 lg:hover:-translate-y-2 rounded-full ${
          clicked.clipboard && "animate animate-ping"
        }`}
      >
        <BsLink45Deg className="text-5xl" />
        <h1 className="text-sm p-2">Copy </h1>
      </span>
    </CopyToClipboard>
  );
};

export default CopyToClip;
