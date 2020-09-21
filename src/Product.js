import React from 'react'
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import { useStateValue } from "./StateProvider";

function Product({id, title, image, price, rating, ingredients}) {
    const [{basket}, dispatch] = useStateValue();

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
                        ))}
                </div>
            </div>
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Basket</button>
            <div className="product__ingredients">
                <p> {ingredients}</p>
            </div>
            
        
        </div>
    );
}

export default Product;
