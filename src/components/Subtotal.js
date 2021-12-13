import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PlacesAutoComplete from "react-places-autocomplete";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../context/StateProvider";
import { getBasketTotal } from "../reducer/reducer";
import "./css/Subtotal.css";
import { restaurants, MAX_DISH_NUM, STARTING_DISH_ID } from "../util/constants";
import googleImage from "../img/poweredByGoogle.png";
import { removePunctuation } from "../util/helperFunctions";

function Subtotal() {
  const history = useHistory();
  const [{ basket }, dispatch] = useStateValue();

  const getRestaurantArray = () => {
    let restaurantSet = new Set();
    for (const item of basket) {
      let restaurantId = Math.floor(item.id / MAX_DISH_NUM) - STARTING_DISH_ID;
      restaurantSet.add(restaurants[restaurantId]);
    }
    return [...restaurantSet];
  };
  const restaurantArray = getRestaurantArray();

  const [address, setAddress] = useState(
    new Array(restaurantArray.length).fill("")
  );
  const [timeReserve, setTimeReserve] = useState(
    new Array(restaurantArray.length).fill("")
  );

  // Helper Functions
  const areRequiredInputsFilled = () => {
    for (let i = 0; i < restaurantArray.length; i++) {
      if (!(address[i] && timeReserve[i])) return false;
    }
    return true;
  };

  const areLocationsCorrect = () => {
    for (let i = 0; i < restaurantArray.length; i++) {
      //Checks if address without punctuation includes corresponding restaurant
      if (
        !removePunctuation(address[i]).includes(
          removePunctuation(restaurantArray[i])
        )
      )
        return false;
    }
    return true;
  };

  // Subtotal Components
  const autocompleteSearchBar = (restaurant, index) => (
    <PlacesAutoComplete
      key={`place__autocomplete_${restaurant}_${index}`}
      value={address[index]}
      onChange={(e) => {
        setAddress((prev) => {
          let next = prev.slice();
          next[index] = e;
          return next;
        });
      }}
      onSelect={(e) => {
        setAddress((prev) => {
          let next = prev.slice();
          next[index] = e;
          return next;
        });
      }}
      searchOptions={{
        types: ["establishment"],
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: `Search for a(n) ${restaurant} location`,
              className: "subtotal__location",
            })}
          />

          <div
            key={`suggestion_div_${restaurant}_${index}`}
            style={{ position: "absolute" }}
            className="autocomplete-dropdown"
          >
            {suggestions.map((suggestion, index) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              const style = suggestion.active
                ? { backgroundColor: "#E8E8E8", cursor: "pointer" }
                : { backgroundColor: "#FFF", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
            {suggestions.length ? (
              <img src={googleImage} alt="" className="google__image" />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </PlacesAutoComplete>
  );

  const restaurantSubtotals = () => {
    //Adds restaurants based on checkout id (check constants for values)
    //Order: McDonald's, PizzaPizza, ...
    let restaurantSubtotal = [];
    restaurantArray.forEach((restaurant, index) => {
      restaurantSubtotal.push(
        <h3 key={`subtotal__${restaurant}`}> {restaurant} </h3>
      );
      restaurantSubtotal.push(
        <label key={`subtotal__location_${restaurant}`} htmlFor="location">
          Location:
        </label>
      );
      restaurantSubtotal.push(
        <div key={`subtotal__autocomplete_${restaurant}`}>
          {window.google && autocompleteSearchBar(restaurant, index)}{" "}
        </div>
      );
      restaurantSubtotal.push(
        <label key={`subtotal__reservation_${restaurant}`} htmlFor="appt">
          Reservation Time:
        </label>
      );
      restaurantSubtotal.push(
        <input
          key={`subtotal__reservationTime_${restaurant}`}
          className="subtotal__reservationTime"
          type="time"
          id="appt"
          name="appt"
          min="09:00"
          max="18:00"
          required
          onChange={() =>
            setTimeReserve((prev) => {
              let next = prev.slice();
              next[index] = true;
              return next;
            })
          }
        />
      );
    });

    return restaurantSubtotal;
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <p>
            Subtotal ({basket.length} items): <strong>{value} </strong>
          </p>
        )}
        value={getBasketTotal(basket) / 100}
        decimalScale={2}
        fixedDecimalScale={true}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <div className="details">{restaurantSubtotals()}</div>

      <button
        onClick={(e) => {
          !basket.length
            ? toast.error("No items to checkout!", { autoClose: 2000 })
            : !areRequiredInputsFilled()
            ? toast.error(
                "Please ensure every location and reservation time is set!",
                { autoClose: 2000 }
              )
            : !areLocationsCorrect()
            ? toast.error(
                "Please ensure the location is of the corresponding restaurant!",
                { autoClose: 2000 }
              )
            : history.push("/checkout");
        }}
      >
        {" "}
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
