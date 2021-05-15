import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../src/components/Loading";
import AllShops from "./pages/AllShops";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Collection from "./pages/Collection";
import YoutubePlayer from "./pages/YoutubePlayer";
import Hero from "./components/Hero";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";
const App = () => {
  const loading = useSelector((state) => state.globalState.loading);

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
