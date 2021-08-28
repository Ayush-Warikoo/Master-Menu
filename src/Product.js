import React from "react";
import "./Product.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStateValue } from "./StateProvider";
import {RED, BLACK, GREEN } from "./constants";

function Product({ product }) {
  const [{ allergy, preference, budget, rating, diet }, dispatch] =
    useStateValue();

  const buttonColor = () => {
    let ratingInt = parseInt(rating);
    
    if (
      !allergy.some((i) => i) &&
      !preference.some((i) => i) &&
      !budget &&
      (!ratingInt || diet === "None") &&
      (!diet || diet === "None")
    ) {
      return BLACK;
    }
    //Diet
    if (diet && diet !== "None") {
      if (
        (diet === "Vegan" && product.type !== "Vegan") ||
        (diet === "Vegetarian" &&
          product.type !== "Vegan" &&
          product.type !== "Vegetarian") ||
        (diet === "Pescetarian" &&
          product.type !== "Vegan" &&
          product.type !== "Vegetarian" &&
          product.type !== "Pescetarian") ||
        (diet === "Pollopescetarian" &&
          product.type !== "Vegan" &&
          product.type !== "Vegetarian" &&
          product.type !== "Pescetarian" &&
          product.type !== "Pollopescetarian")
      ) {
        return RED;
      }
    }
    //Allergy
    for (const all of allergy) {
      if (all && product.ingredients.includes(all)) {
        return RED;
      }
    }
    //Budget
    if (budget && product.price > budget) {
      return RED;
    }
    //Rating
    if (ratingInt && product.stars < ratingInt) {
      return RED;
    }
    //Preference
    for (const pref of preference) {
      if (pref && product.ingredients.includes(pref)) {
        return GREEN;
      }
    }
    if (preference.some((a) => a)) {
      return RED;
    }

    return GREEN;
  };

  const addToBasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.stars,
        ingredients: product.ingredients,
        type: product.type,
      },
    });
  };

  const ratingOutput = () => {
    let s = [];
    for (let i = 0; i < 5; i++) {
      if (i < product.stars) {
        s.push(<StarIcon key={`product__rating_${i}`} />);
      } else {
        s.push(<StarBorderIcon key={`product__rating_${i}`} />);
      }
    }
    return s;
  };

  return (
    <div className="product">
      <div className="product__header">
        <div className="product__info">
          <h2> {product.title} </h2>
          <p className="product__price">
            <small> $ </small>
            <strong> {product.price} </strong>
          </p>
          <div className="product__rating">{ratingOutput()}</div>
        </div>
      </div>
      <img src={product.image} alt="" />
      <div className="product__ingredients">
        <p> Ingredients: {product.ingredients}</p>
      </div>
      <button onClick={addToBasket} style={{ backgroundColor: buttonColor() }}>
        {" "}
        Add to Order{" "}
      </button>
    </div>
  );
}

export default Product;
