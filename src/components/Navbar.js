/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Logo from "./img/Logo.png";
import appFirebase from "../firebase/firebase";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  const handleSignOut = () => {
    appFirebase.auth().signOut();
  };

  return (
    <nav className=" bg-gray-100 w-full">
      <div className="flex justify-between max-w-screen-xl mx-auto p-4">
        <Link className="flex items-center " to="/">
          <img src={Logo} className="sm:w-8 w-6" alt="logo" />
          <h1 className="sm:text-2xl text-lg font-semibold">RecordBAG</h1>
        </Link>

        {currentUser.user ? (
          <div className="flex items-center font-semibold md:text-xl">
            <Link to="/collection">
              <h1 className="mr-2 sm:mr-4 text-base sm:text-xl">
                {currentUser.user.displayName}{" "}
              </h1>
            </Link>
            <AiOutlineLogout
              className="sm:text-3xl cursor-pointer text-xl"
              onClick={() => {
                try {
                  handleSignOut();
                  history.push("/login");
                } catch (e) {
                  console.log(e);
                }
              }}
            />
          </div>
        ) : (
          <div className="flex items-center font-semibold md:text-xl">
            <h1 className="mr-4">
              <Link to="/signup">Sign Up </Link>
            </h1>
            <h1>
              <Link to="/login">LogIn </Link>
            </h1>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
