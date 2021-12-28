import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./css/CheckoutProduct.css";
import { MAX_STARS } from "../util/constants";
import { useBasketContext } from "../context/BasketContext";

const CheckoutProduct = ({
  id,
  image,
  title,
  price,
  rating,
  ingredients,
  hideButton,
  quantity,
}) => {
  const [, basketDispatch] = useBasketContext();

  const removeFromBasket = () => {
    // remove the item from the basket
    basketDispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return React.useMemo(() => {
    return (
      <div className="checkoutProduct">
        <img className="checkoutProduct__image" src={image} alt="product" />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__quantity">
            {" "}
            <strong> Qty: {quantity || 1} </strong>
          </p>
          <p className="checkoutProduct__price">
            <strong> Price: ${price} </strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon key={`checkoutProduct__rating_${i}`} />
              ))}
            {Array(MAX_STARS - rating)
              .fill()
              .map((_, i) => (
                <StarBorderIcon
                  key={`checkoutProduct__rating_${MAX_STARS - i}`}
                />
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          )}
        </div>
      </div>
    );
  }, [image, title, quantity, price, rating]);
};

export default CheckoutProduct;
