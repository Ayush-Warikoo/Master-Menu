import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./css/HomePage.css";
import logo from "../img/logo-white.png";
import { MID_TOAST_DURATION, restaurants } from "../util/constants";
import { removePunctuation } from "../util/helperFunctions";

function HomePage() {
  const history = useHistory();
  const [searchBarText, setSearchBarText] = useState("");

  const search = () => {
    for (let i = 0; i < restaurants.length; i++) {
      if (
        removePunctuation(searchBarText).toLowerCase() ===
        removePunctuation(restaurants[i]).toLowerCase()
      ) {
        history.push(`/${removePunctuation(searchBarText)}`);
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
    <div className="homepage">
      <img className="homepage__logo" src={logo} alt="" />
      <div>
        <form>
          <h1 className="homepage__text"> Begin your food journey here!</h1>
          <div className="homepage__form">
            <input
              className="homepage__searchbar"
              type="text"
              list="homepage__restaurant"
              placeholder="Enter a restaurant"
              value={searchBarText}
              onChange={(e) => setSearchBarText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
                handleKeyPress(e.key);
              }}
            />
            <datalist id="homepage__restaurant">
              {restaurants.map((restaurant) => (
                <option key={`homepage__option_${restaurant}`}>
                  {" "}
                  {restaurant}{" "}
                </option>
              ))}
            </datalist>
            <button className="homepage__button" type="button" onClick={search}>
              {" "}
              Search{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
