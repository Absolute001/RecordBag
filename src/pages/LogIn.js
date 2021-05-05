/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  emailLoginHandler,
  passwordLoginHandler,
  errorLoginHandler,
} from "../redux/userLogIn";
import appFirebase from "../firebase/firebase";
import { useHistory } from "react-router-dom";
import { loadingHandler } from "../redux/fetch";
import Loading from "../components/Loading";

const LogIn = () => {
  const email = useSelector((state) => state.userLogInState.email);
  const password = useSelector((state) => state.userLogInState.password);
  const error = useSelector((state) => state.userLogInState.error);
  const loading = useSelector((state) => state.globalState.loading);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(loadingHandler(true));
      await appFirebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(loadingHandler(false));
      history.push("/");
    } catch (error) {
      dispatch(loadingHandler(false));
      dispatch(errorLoginHandler(error.message));
    }
  };

  useEffect(() => {
    dispatch(loadingHandler(false));
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <section className="p-4 sm:p-24 max-w-screen-xl mx-auto flex">
      <div className="w-full">
        <div className=" mx-auto text-white bg-black lg:w-3/6">
          <img
            src="https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1353&q=80"
            className="w-max-full"
            alt="log in cover"
          />

          <form
            className="flex mx-auto py-8 my-auto w-full text-xl"
            onSubmit={handleLogIn}
          >
            <div className="w-5/6 flex flex-col mx-auto">
              <h1 className="text-2xl font-semibold mb-8 text-center">
                Login to reunite with all your precious records
                {error && (
                  <span className="text-center text-base text-red-500">
                    {" "}
                    <br /> {error}
                  </span>
                )}
              </h1>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                className="border mb-8 text-sm p-2 text-black"
                placeholder="kevinshallvari@yahoo.com"
                value={email}
                onChange={(e) => dispatch(emailLoginHandler(e.target.value))}
              />
              <label>Password:</label>
              <input
                type="password"
                name="email"
                className="border mb-8 text-sm p-2 text-black"
                placeholder="Password"
                value={password}
                onChange={(e) => dispatch(passwordLoginHandler(e.target.value))}
              />
              <button type="submit" className=" bg-green-500 w-2/6 p-2 mx-auto">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
