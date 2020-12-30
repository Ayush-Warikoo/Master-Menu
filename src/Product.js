import React from 'react'
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStateValue } from "./StateProvider";

function Product({ product }) {
    const [{allergy, preference, budget, rating, diet}, dispatch] = useStateValue();

    const buttonColor = () => {
        let black = "rgb(0, 0, 0)";
        let green = "rgb(17, 191, 93)";
        let red = "rgb(227, 54, 54)"; 


        if(!allergy[0] && !preference[0] && !budget && !rating && !diet)
        {
            return black;
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
                return red;
            }
        }
        //Allergy
        for(const all of allergy)
        {
            if(all !== "" && product.ingredients.includes(all))
            {
                return red;
            }
        }
        //Budget
        if(budget !== null && budget !== "" && product.price > budget)
        {
            return red;
        }
        //Rating
        if(rating !== null && rating !== "" && product.stars < rating )
        {
            return red;
        }
        //Preference
        for(const pref of preference)
        {
            if(pref !== "" && product.ingredients.includes(pref))
            {
                return green;
            }
        }
        if(preference.length !== 0)
        {
            return red;
        }

        return green;
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
            <div className="product__header"> 
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
            </div>
            <img src={product.image} alt=""/>
            <div className="product__ingredients">
                <p> Ingredients: {product.ingredients}</p>
            </div> 
            <button onClick={addToBasket} style={{"backgroundColor":(buttonColor()) }}> Add to Order </button>
        
        </div>
    );
}

export default Product;
