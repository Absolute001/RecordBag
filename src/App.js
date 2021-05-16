/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import appFirebase from './firebase/firebase'
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
import { handleUser } from "../src/redux/currentUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";


const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.currentUser.user);
  const loading = useSelector((state) => state.globalState.loading);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentUser === null) {
      appFirebase.auth().onAuthStateChanged((user) => {
        dispatch(handleUser(user));
      });
    }
  }, []);

  return (
    <main>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            {loading ? <Loading /> : <Hero />}
            <AllShops />
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
