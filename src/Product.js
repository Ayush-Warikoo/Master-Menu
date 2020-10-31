import React, {useEffect} from 'react'
import "./Product.css";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useStateValue } from "./StateProvider";



function Product({id, title, image, price, rating, ingredients }) {
    const [{basket, allergy, preference, budget}, dispatch] = useStateValue();

    //useEffect 
    useEffect(() => {
        console.log({title});
        if(allergy[0] == "" && preference[0] == "" && budget == null)
        {
            console.log("Y");
            document.getElementById("basketAdd").style.background = "#ffc534";
            return;
        }
        //console.log(allergy[0]);
        for(const all of allergy)
        {
            if(all != "" && {ingredients}.ingredients.includes(all))
            {
                console.log(all)
                console.log("R");
                document.getElementById("basketAdd").style.background = "rgb(252, 137, 137)";
                console.log("I HAVE LITERALLY PASSED THE CODE THAT IS SUPPOSED TO WORK");
                return;
            }
        }
        if(budget != null && budget != "" && {price}.price > budget)
        {
            console.log("R");
            document.getElementById("basketAdd").style.background = "rgb(252, 137, 137)";
            return;
        }
        for(const pref of preference)
        {
            if(pref != "" && {ingredients}.ingredients.includes(pref))
            {
                console.log("G");
                document.getElementById("basketAdd").style.background = "rgb(140, 233, 144)";
                return;
            }
        }
        console.log("Y");
        document.getElementById("basketAdd").style.background = "#ffc534";        

    }, [allergy, preference, budget]);

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
            <button id="basketAdd" onClick={addToBasket}>Add to Basket</button>
            <div className="product__ingredients">
                <p> {ingredients}</p>
            </div>
            
        
        </div>
    );
}

export default Product;
