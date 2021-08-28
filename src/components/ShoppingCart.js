import React from "react";
import { useStateValue } from "../context/StateProvider";
import "./css/ShoppingCart.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

function ShoppingCart() {
  const [{ basket }] = useStateValue();

  return (
    <div className="shoppingcart">
      <div className="shoppingcart__left">
        <h1 className="shoppingcart__title"> Shopping Cart </h1>
        <div className="shoppingcart__items">
          {basket.map((item, index) => (
            <CheckoutProduct
              key={`checkout__product_${index}_${item.id}`}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              ingredients={item.ingredients}
            />
          ))}
        </div>
      </div>

      <div className="shoppingcart__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default ShoppingCart;
