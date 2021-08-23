import React, {useEffect, useState} from 'react';
import axios from './axios';
import './App.css';
import Header from './Header';
import Mcdonalds from './Mcdonalds';
import Pizzapizza from './Pizzapizza';
import Checkout from './Checkout';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-router-dom";
import Login from './Login';
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders';
import HomePage from './HomePage';
import logo from "./img/logo-white.png";
import background from "./img/background.jpg";

const promise = loadStripe(`${process.env.REACT_APP_LOAD_STRIPE_KEY}`);

function App() {
  const [{}, dispatch] = useStateValue();
  const preload = [logo, background];

  useEffect(() => {
    // will only run once when the app component loads

    preload.forEach(img => {
        const image = new Image();
        image.src = img;
    })

    auth.onAuthStateChanged((authUser) => {
      //console.log("The user is:", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
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
          <Route path="/mcdonalds">
            <Header />
            <Mcdonalds />
          </Route>

          <Route path="/pizzapizza">
            <Header />
            <Pizzapizza />
          </Route>
          
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
