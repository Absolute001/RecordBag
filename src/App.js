/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import appFirebase from "./firebase/firebase";
import Navbar from "./components/Navbar";
import Loading from "../src/components/Loading";
import AllShops from "./pages/AllShops";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Collection from "./pages/Collection";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import SelectedRecord from "./pages/SelectedRecord";
import { ErrorPage } from "./pages/ErrorPage";
import { handleUser, handleCollection } from "../src/redux/currentUser";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.user);
  const loading = useSelector((state) => state.globalState.loading);
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
          dispatch(handleCollection(data.likedRecords));
        } else {
          console.log("No such document!");
        }
      });
    }
  }, [currentUser]);

  return loading ? (
    <Loading />
  ) : (
    <Router>
      <main>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <AllShops />
          </Route>
          <Route path="/collection">
            {currentUser ? <Collection /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/shop/:channelId">
            <Shop />
          </Route>
          <Route exact path="/shop/:channelId/player/:videoId">
            <SelectedRecord />
          </Route>
          <Route path="/login">
            {!currentUser ? <Login /> : <Redirect to="/collection" />}
          </Route>
          <Route path="/signup">
            {!currentUser ? <SignUp /> : <Redirect to="/collection" />}
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
