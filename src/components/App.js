import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { auth } from "../tools/firebase";
import { useStateValue } from "../context/StateProvider";
import "./css/App.css";
import Header from "./Header";
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";
import RestaurantPage from "./RestaurantPage";
import Login from "./Login";
import Orders from "./Orders";
import HomePage from "./HomePage";
import logo from "../img/logo-white.png";
import background from "../img/background.jpg";
import { restaurants } from "../util/constants";
import { removePunctuation } from "../util/helperFunctions";

const promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);
toast.configure();

function App() {
  const [{ basket }, dispatch] = useStateValue();
  //const [restaurants, setRestaurants] = useState([]);
  const preload = [logo, background];

  useEffect(() => {
    // will only run once when the app component loads

    preload.forEach((img) => {
      const image = new Image();
      image.src = img;
    });

    // Pulls list of restaurants from db (dynamic), adds to latency
    // db.collection('Restaurant Information').get().then(snap => {
    //     let restaurants = [];
    //     snap.forEach((doc) => {
    //         restaurants.push(doc.id);
    //     })
    //     setRestaurants(restaurants);
    // });

    const googlePlacesApi = document.createElement(`script`);
    googlePlacesApi.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`;
    document
      .querySelector("body")
      .insertAdjacentElement("beforeend", googlePlacesApi);

    //Listens for sign ins and outs
    auth.onAuthStateChanged((authUser) => {
      // the user just logged in / the user was logged in
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setTimeout(() => {
          toast.info(
            `Welcome back, ${
              authUser.displayName ? authUser.displayName : authUser.email
            }!`,
            { autoClose: 2000 }
          );
        }, 800);
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          {/* Restaurant pages */}
          {restaurants.map((restaurant) => (
            <Route
              key={`route__${restaurant}`}
              path={`/${removePunctuation(restaurant)}`}
            >
              <Header />
              <RestaurantPage restaurant={restaurant} />
            </Route>
          ))}

          {/* Login page */}
          <Route path="/login">
            <Login />
          </Route>

          {/* Shopping Cart page*/}
          <Route path="/shoppingcart">
            <Header />
            <ShoppingCart />
          </Route>

          {/* Checkout page*/}
          <Route path="/checkout">
            <Header />
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          </Route>

          {/* Order History page */}
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
