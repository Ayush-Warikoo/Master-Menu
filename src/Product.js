import React from 'react'
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStateValue } from "./StateProvider";

function Product({id, title, image, price, rating, ingredients }) {
    const [{allergy, preference, budget}, dispatch] = useStateValue();

    function buttonColor()
    {
        if(allergy[0] === "" && preference[0] === "" && budget == null)
        {
            return "#ffc534";
        }
        for(const all of allergy)
        {
            if(all !== "" && {ingredients}.ingredients.includes(all))
            {
                return "rgb(252, 137, 137)";
            }
        }
        if(budget !== null && budget !== "" && {price}.price > budget)
        {
            return "rgb(252, 137, 137)";
        }
        for(const pref of preference)
        {
            if(pref !== "" && {ingredients}.ingredients.includes(pref))
            {
                return "rgb(140, 233, 144)";
            }
        }
        return "#ffc534";
    }

    const addToBasket = () => {
        // dispatch the item into the data layer
        dispatch({
          type: "ADD_TO_BASKET",
          item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
            ingredients: ingredients
          },
        });
    };

    return (
        <div className="product">
            <div className="product__info"> 
                <h2> {title} </h2>
                <p className="product__price"> 
                    <small> $ </small>
                    <strong> {price} </strong>
                </p>
                <div className="product__rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon />
                        )) }
                    {Array(5 - rating)
                        .fill()
                        .map((_, i) => (
                            <StarBorderIcon />
                        ))}
                </div>
            </div> 
            <img src={image} alt=""/>
            <button onClick={addToBasket} style={{"backgroundColor":(buttonColor())}}> Add to Basket </button>
            <div className="product__ingredients">
                <p> {ingredients}</p>
            </div> 
        
        </div>
    );
}

export default Product;
