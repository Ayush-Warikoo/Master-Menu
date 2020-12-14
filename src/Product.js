import React from 'react'
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStateValue } from "./StateProvider";

function Product({ product }) {
    const [{allergy, preference, budget, rating, diet}, dispatch] = useStateValue();

    const buttonColor = () => {

        if(allergy[0] === "" && preference[0] === "" && budget === null && rating === null && diet == null)
        {
            return "#ffc534";
        }
        //Diet
        if(diet !== null && diet !=="None")
        {
            if((diet === "Vegan" && product.type !== "Vegan") 
            ||(diet === "Vegetarian" && product.type !== "Vegan" && product.type !== "Vegetarian")
            ||(diet === "Pescetarian" && product.type !== "Vegan" && product.type !== "Vegetarian" && product.type !== "Pescetarian")
            ||(diet === "Pollopescetarian" && product.type !== "Vegan" && product.type !== "Vegetarian"  && product.type !== "Pescetarian" && product.type !== "Pollopescetarian") 
            )
            {
                return "rgb(252, 137, 137)";
            }
        }
        //Allergy
        for(const all of allergy)
        {
            if(all !== "" && product.ingredients.includes(all))
            {
                return "rgb(252, 137, 137)";
            }
        }
        //Budget
        if(budget !== null && budget !== "" && product.price > budget)
        {
            return "rgb(252, 137, 137)";
        }
        //Rating
        if(rating !== null && rating !== "" && product.stars < rating )
        {
            return "rgb(252, 137, 137)";
        }
        //Preference
        for(const pref of preference)
        {
            if(pref !== "" && product.ingredients.includes(pref))
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
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            rating: product.stars,
            ingredients: product.ingredients,
            type: product.type
          },
        });
    };

    const ratingOutput = () => {
        let s = [];
        for(let i = 0; i < 5; i++)
        {
            if(i < product.stars)
            {
                s.push(<StarIcon />);
            }
            else
            {
                s.push(<StarBorderIcon />);
            }
        }
        return s;
    }

    return (

        <div className="product">
            <div className="product__info"> 
                <h2> {product.title} </h2>
                <p className="product__price"> 
                    <small> $ </small>
                    <strong> {product.price} </strong>
                </p>
                <div className="product__rating">
                    {ratingOutput()}
                </div>
            </div> 
            <img src={product.image} alt=""/>
            <button onClick={addToBasket} style={{"backgroundColor":(buttonColor())}}> Add to Basket </button>
            <div className="product__ingredients">
                <p> Ingredients: {product.ingredients}</p>
            </div> 
        
        </div>
    );
}

export default Product;
