import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../tools/firebase";
import "./css/Header.css";
import logo from "../img/logo-white.png";
import {
  MID_TOAST_DURATION,
  restaurants,
  SHORT_TOAST_DURATION,
} from "../util/constants";
import { removePunctuation } from "../util/helperFunctions";
import {
  getBasketTotalQuantity,
  useBasketContext,
} from "../context/BasketContext";
import { useAuthContext } from "../context/AuthContext";

function Header() {
  const [{ basket }, basketDispatch] = useBasketContext();
  const [{ user }] = useAuthContext();

  const history = useHistory();
  const [searchBarText, setSearchBarText] = useState("");

  //logout
  const handleAuthentication = () => {
    if (user) {
      basketDispatch({
        type: "EMPTY_BASKET",
      });
      toast.info(
        `See ya, ${user.displayName ? user.displayName : user.email}!`,
        { autoClose: SHORT_TOAST_DURATION }
      );
      auth.signOut();
    }
  };

  const search = () => {
    for (let i = 0; i < restaurants.length; i++) {
      if (
        removePunctuation(searchBarText).toLowerCase() ===
        removePunctuation(restaurants[i].toLowerCase())
      ) {
        history.push(`/${removePunctuation(searchBarText)}`);
        setSearchBarText("");
        return true;
      }
    }
    if (searchBarText) {
      toast.error("Sorry, restaurant not available!", {
        autoClose: MID_TOAST_DURATION,
      });
    }
  };

  const handleKeyPress = (key) => {
    if (key === "Enter") {
      search();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        {/*logo*/}
        <img className="header__logo" src={logo} alt="" />
      </Link>

      {/*search bar*/}
      <div className="header__search">
        <input
          className="header__searchInput"
          placeholder="Enter a restaurant..."
          list="header__restaurant"
          type="text"
          value={searchBarText}
          onChange={(e) => setSearchBarText(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e.key)}
        />
        <datalist id="header__restaurant">
          {restaurants.map((restaurant) => (
            <option key={`header__option_${restaurant}`}> {restaurant} </option>
          ))}
        </datalist>
        <Link to={`/${removePunctuation(searchBarText)}`}>
          <SearchIcon className="header__searchIcon" />
        </Link>
      </div>

      {/*header options*/}
      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLine">
              Hello{" "}
              {!user
                ? "Guest"
                : user.displayName
                ? user.displayName
                : user.email}
              {","}
            </span>
            <span className="header__optionLine">
              {" "}
              {!user ? "Sign In" : "Sign Out"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLine"> Order </span>
            <span className="header__optionLine"> History </span>
          </div>
        </Link>

        <Link to="/shoppingcart">
          <div className="header__option">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {getBasketTotalQuantity(basket)}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
