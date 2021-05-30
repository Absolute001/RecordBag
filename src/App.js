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
import ErrorPage from "./pages/ErrorPage";
import * as ROUTES from "./const/routes";
import { handleUser, handleCollection } from "../src/redux/currentUser";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const channels = useSelector((state) => state.globalState.channel);
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
      <Navbar />
      <Switch>
        <Route exact path="/">
          <AllShops channels={channels} />
        </Route>
        <Route path={ROUTES.collection}>
          {currentUser ? <Collection /> : <Redirect to={ROUTES.login} />}
        </Route>
        <Route exact path={ROUTES.shop}>
          <Shop />
        </Route>
        <Route exact path={ROUTES.selectedRecord}>
          <SelectedRecord />
        </Route>
        <Route path={ROUTES.login}>
          {!currentUser ? <Login /> : <Redirect to={ROUTES.collection} />}
        </Route>
        <Route path={ROUTES.signup}>
          {!currentUser ? <SignUp /> : <Redirect to={ROUTES.collection} />}
        </Route>
        <Route exact path={ROUTES.error}>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
