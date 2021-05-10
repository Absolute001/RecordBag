/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fnameHandler,
  lnameHandler,
  emailHandler,
  passwordHandler,
  errorSignUpHandler,
} from "../redux/userSignUp";
import { useHistory } from "react-router-dom";
import appFirebase from "../firebase/firebase";
import "firebase/firestore";
import { loadingHandler } from "../redux/fetch";
import Loading from "../components/Loading";

const SignUp = () => {
  const fname = useSelector((state) => state.userSignUpState.fname);
  const lname = useSelector((state) => state.userSignUpState.lname);
  const email = useSelector((state) => state.userSignUpState.email);
  const password = useSelector((state) => state.userSignUpState.password);
  const error = useSelector((state) => state.userSignUpState.error);
  const loading = useSelector((state) => state.globalState.loading);
  const db = appFirebase.firestore();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadingHandler(false));
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      dispatch(loadingHandler(true));

      await appFirebase.auth().createUserWithEmailAndPassword(email, password);

      await appFirebase.auth().currentUser.updateProfile({
        displayName: `${fname} ${lname}`,
      });

      await db.collection("users").doc(email).set({
        fname: fname,
        lname: lname,
        likedRecords: [],
      });
      dispatch(loadingHandler(false));
      history.push("/");
    } catch (error) {
      dispatch(loadingHandler(false));
      dispatch(errorSignUpHandler(error.message));
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="p-4 sm:p-24 max-w-screen-xl mx-auto flex">
      <div className=" w-full">
        <div className=" mx-auto text-white bg-black lg:w-3/6">
          <img
            src="https://images.unsplash.com/photo-1581041122145-9f17c04cd153?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
            className="w-max-full"
            alt="log in cover"
          />

          <form
            className="flex mx-auto py-8 my-auto w-full text-xl"
            onSubmit={handleSignUp}
          >
            <div className="w-5/6 flex flex-col mx-auto">
              <h1 className="text-2xl font-semibold mb-8 text-center">
                Welcome to our passionate family!
                {error && (
                  <span className="text-center text-base text-red-500">
                    {" "}
                    <br /> {error}
                  </span>
                )}
              </h1>
              <div className="flex justify-between">
                <div className="flex flex-col w-3/6 mr-2">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="fname"
                    className="border mb-8 text-sm p-2 text-black"
                    placeholder="Kevin"
                    value={fname}
                    onChange={(event) =>
                      dispatch(fnameHandler(event.target.value))
                    }
                  />
                </div>

                <div className="flex flex-col w-3/6">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lname"
                    className="border mb-8 text-sm p-2 text-black"
                    placeholder="Shallvari"
                    value={lname}
                    onChange={(event) =>
                      dispatch(lnameHandler(event.target.value))
                    }
                  />
                </div>
              </div>

              <label>Email:</label>
              <input
                type="text"
                name="email"
                className="border mb-8 text-sm p-2 text-black"
                placeholder="kevinshallvari@yahoo.com"
                value={email}
                onChange={(event) => dispatch(emailHandler(event.target.value.toLowerCase()))}
              />
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="border mb-8 text-sm p-2 text-black"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  dispatch(passwordHandler(event.target.value))
                }
              />
              <button
                type="submit"
                className="disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 w-2/6 p-2 mx-auto"
              >
                Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
