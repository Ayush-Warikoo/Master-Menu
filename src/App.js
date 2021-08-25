import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-router-dom";
import Login from "./Login";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import HomePage from "./HomePage";
import logo from "./img/logo-white.png";
import background from "./img/background.jpg";
import RestaurantPage from "./RestaurantPage";
import { restaurants } from "./constants";
import { toast } from "react-toastify";

const promise = loadStripe(`${process.env.REACT_APP_LOAD_STRIPE_KEY}`);
toast.configure();

function App() {
  const [{}, dispatch] = useStateValue();
  //const [restaurants, setRestaurants] = useState([]);
  const preload = [logo, background];

  useEffect(() => {
    // will only run once when the app component loads

    preload.forEach((img) => {
      const image = new Image();
      image.src = img;
    });

    //Pulls list of restaurants from db, takes a second though
    // db.collection('Restaurant Information').get().then(snap => {
    //     let restaurants = [];
    //     snap.forEach((doc) => {
    //         restaurants.push(doc.id);
    //     })
    //     setRestaurants(restaurants);
    // });

    //Listens for sign ins and outs 
    auth.onAuthStateChanged((authUser) => {
      //console.log("The user is:", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setTimeout(() => {
          toast.info(`Welcome back, ${authUser.displayName ? authUser.displayName : authUser.email}!`, {autoClose: 2000});
        }, 800)
        
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          {/* Sample restaurant pages */}
          {restaurants.map((restaurant) => (
            <Route key={`route__${restaurant}`} path={`/${restaurant}`}>
              <Header />
              <RestaurantPage restaurant={restaurant} />
            </Route>
          ))}

          {/* Login page */}
          <Route path="/login">
            <Login />
          </Route>

          {/* Checkout page*/}
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          {/* Payment page*/}
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          {/* Order page */}
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          {/* Home page */}
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
