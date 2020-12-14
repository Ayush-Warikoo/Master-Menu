import React from 'react'
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStateValue } from "./StateProvider";

function Product({id, title, image, price, stars, ingredients, type }) {
    const [{allergy, preference, budget, rating, diet}, dispatch] = useStateValue();

    function buttonColor()
    {
        if(allergy[0] === "" && preference[0] === "" && budget === null && rating === null && diet == null)
        {
            return "#ffc534";
        }
        //Diet
        if(diet !== null && diet !=="None")
        {
            if((diet === "Vegan" && {type}.type !== "Vegan") 
            ||(diet === "Vegetarian" && {type}.type !== "Vegan" && {type}.type !== "Vegetarian")
            ||(diet === "Pescetarian" && {type}.type !== "Vegan" && {type}.type !== "Vegetarian" && {type}.type !== "Pescetarian")
            ||(diet === "Pollopescetarian" && {type}.type !== "Vegan" && {type}.type !== "Vegetarian"  && {type}.type !== "Pescetarian" && {type}.type !== "Pollopescetarian") 
            )
            {
                return "rgb(252, 137, 137)";
            }
        }
        //Allergy
        for(const all of allergy)
        {
            if(all !== "" && {ingredients}.ingredients.includes(all))
            {
                return "rgb(252, 137, 137)";
            }
        }
        //Budget
        if(budget !== null && budget !== "" && {price}.price > budget)
        {
            return "rgb(252, 137, 137)";
        }
        //Rating
        if(rating !== null && rating !== "" && {stars}.stars < rating )
        {
            return "rgb(252, 137, 137)";
        }
        //Preference
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
            rating: stars,
            ingredients: ingredients,
            type: type
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
                    {Array(stars)
                        .fill()
                        .map((_, i) => (
                            <StarIcon />
                        )) }
                    {Array(5 - stars)
                        .fill()
                        .map((_, i) => (
                            <StarBorderIcon />
                        ))}
                </div>
            </div> 
            <img src={image} alt=""/>
            <button onClick={addToBasket} style={{"backgroundColor":(buttonColor())}}> Add to Basket </button>
            <div className="product__ingredients">
                <p> Ingredients: {ingredients}</p>
            </div> 
        
        </div>
    );
}

export default Product;
