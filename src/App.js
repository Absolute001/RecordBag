/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import appFirebase from "./firebase/firebase";
import Navbar from "./components/Navbar";
import Loading from "../src/components/Loading";
import AllShops from "./pages/AllShops";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Collection from "./pages/Collection";
import YoutubePlayer from "./pages/YoutubePlayer";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { handleUser, handleCollection } from "../src/redux/currentUser";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchChannel } from "../src/redux/fetch";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);
  const loading = useSelector((state) => state.globalState.loading);
  const channels = useSelector((state) => state.globalState.channel);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser === null) {
      appFirebase.auth().onAuthStateChanged((user) => {
        dispatch(handleUser(user));
      });
    } else {
      const docRef = appFirebase
        .firestore()
        .collection("users")
        .doc(currentUser.email);
      docRef.get().then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          dispatch(handleCollection(data.likedRecords.reverse()));
        } else {
          console.log("No such document!");
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (channels.length === 0) {
      dispatch(fetchChannel());
    }
  }, []);


  return (
    <Router>
      {loading ? (
        <Loading />
      ) : (
        <main>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <AllShops channels={channels} />
            </Route>
            <Route path="/collection">
              {currentUser !== null ? <Collection /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/shop/:channelId">
              <Shop />
            </Route>
            <Route exact path="/shop/:channelId/player/:videoId">
              <YoutubePlayer />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
          <Footer />
        </main>
      )}
    </Router>
  );
};

export default App;
