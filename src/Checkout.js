import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <h2 className="checkout__title"> Your Order </h2>
        <div className="checkout__items">
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
