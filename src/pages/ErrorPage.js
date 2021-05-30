import React from "react";
import Illuminati from "../components/img/illuminati.png";

export const ErrorPage = () => {
  return (
    <article className="flex flex-col p-4 mb-4 lg:mb-24 min-h-screen max-w-screen-xl mx-auto">
      <div className="flex flex-col my-auto">
        <picture className="mb-8 w-full ">
          <img src={Illuminati} alt="error logo" className="mx-auto w-2/6" />
        </picture>
        <section className="flex flex-col text-2xl text-center">
          <h1 className="text-6xl mb-8">ERROR!</h1>
          <q className="w-5/6 mx-auto">
            Please do not be alarmed, remain calm. Do not attempt to leave the
            dancefloor. The DJ booth is conducting a troubleshoot test of the
            entire system. Somehow, while the party was in progress, an
            unidentified frequency has been existing in the system for some
            time. And while many of you have been made too brainwashed to
            comprehend, this frequency is, and has become a threat to our
            soceity as we know it. This frequency has been used by a secret
            society in conjunction with Lucifer to lure and prey on innocent
            partygoers. With hypnotism, syncroprism, tricknology, lies, scandal,
            and !@$^ography. While the party is still in progress we will keep
            you updated on our current status. We repeat, this is only a test,
            this is only a test.
          </q>

          <button
            onClick={(e) => {
              window.open("https://youtu.be/rb4-oOKIZQ8?t=21", "_blank");
              window.location.href = "/";
            }}
            className="text-white border-black font-bold border-4 mt-8 p-4 mx-auto bg-red-600 animate-pulse"
          >
            PANIC BUTTON
          </button>
        </section>
      </div>
    </article>
  );
};

export default ErrorPage;
