import React from "react";
import {
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center text-lg p-5 2xl:text-xl">
      <p>This is website was created by</p>
      <h1 className="mt-2 text-2xl xl:text-3xl">Kevin Shallvari</h1>
      <div className="flex w-full justify-center p-5">
        <a href="https://www.linkedin.com/in/kevin-shallvari-a6177b1b8/">
          <AiFillLinkedin className="w-10 mx-5 h-10" />
        </a>
        <a href="https://www.facebook.com/profile.php?id=100010434435290">
          <AiFillFacebook className="w-10 mx-5 h-10" />
        </a>
        <a href="https://www.instagram.com/kevin.leonardo.sh/">
          <AiFillInstagram className="w-10 mx-5 h-10" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
