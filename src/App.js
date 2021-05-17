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
import Hero from "./components/Hero";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { handleUser,handleCollection } from "../src/redux/currentUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchChannel } from "../src/redux/fetch";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);
  const loading = useSelector((state) => state.globalState.loading);
  const channels = useSelector((state) => state.globalState.channel);
  const user = useSelector((state) => state.currentUser.user);

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
        .doc(user.email);
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
    <main>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {loading ? (
              <Loading />
            ) : (
              <>
                <Hero />
                <AllShops channels={channels} />
              </>
            )}
          </Route>
          <Route path="/collection">
            <Collection />
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
      </Router>
    </main>
  );
};

export default App;
