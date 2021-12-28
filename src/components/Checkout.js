import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import axios from "../tools/axios";
import { db } from "../tools/firebase";
import { getBasketTotalCost, useBasketContext } from "../context/BasketContext";
import "./css/Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { SHORT_TOAST_DURATION } from "../util/constants";
import { useAuthContext } from "../context/AuthContext";

function Checkout() {
  const [{ basket }, basketDispatch] = useBasketContext();
  const [{ user }] = useAuthContext();

  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);

  //Listener that loads on every render, where we don't have the client secret
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotalCost(basket)}`,
      });

      //Get the secret back from stripe, which allows us to charge the right amount
      setClientSecret(response.data.clientSecret);
    };
    if (user && getBasketTotalCost(basket) > 0 && !clientSecret) {
      getClientSecret();
    }
  });

  const handleSubmit = async (event) => {
    //Stops refreshing
    event.preventDefault();
    //Blocks user from hitting the button again after its already processing
    setProcessing(true);

    if (!user) {
      history.replace("/login");
      toast.error("Please sign in first, before making a purchase!", {
        autoClose: SHORT_TOAST_DURATION,
      });
      return;
    }

    //Confirms client secret
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        //Push the payment into the database
        //Going user's collection, into orders, setting an id,

        paymentIntent.amount = getBasketTotalCost(basket);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        basketDispatch({
          type: "EMPTY_BASKET",
        });

        toast.success("Purchase successful!", {
          autoClose: SHORT_TOAST_DURATION,
        });
        //Push them to orders page to not create a loop
        history.replace("/orders");
      })
      .catch((e) => {
        toast.error("Purchase unsuccessful, please try again!", {
          autoClose: SHORT_TOAST_DURATION,
        });
      });
  };

  const handleChange = (event) => {
    //Dynamic alerts when customer is typing card details
    //Listen for changes in card element
    setDisabled(event.empty); //Disable the button
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        {/* Restaurant */}
        <div className="checkout__section">
          <div className="checkout__title">
            <h1> Checkout </h1>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="checkout__section">
          <div className="checkout__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="checkout__items">
            {basket.map((item, index) => (
              <CheckoutProduct
                key={`checkout__items_${index}_${item.id}`}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                ingredients={item.ingredients}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method </h3>
          </div>
          <div className="payment__details">
            <p style={{ fontStyle: "italic" }}>
              *For testing purposes - Card Number: 4242 4242 4242 4242, &nbsp;
              Exp. Date: 4 / 24, &nbsp; CVC: 242, &nbsp; ZIP: 42424 &nbsp;
              (Alternate 4 and 2)
            </p>
            <br />
            <form onSubmit={handleSubmit}>
              <CardElement className="Input" onChange={handleChange} /> <br />
              <div className="payment__priceConatiner">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={getBasketTotalCost(basket) / 100}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={
                    processing || disabled || succeeded || basket.length === 0
                  }
                >
                  <span> {processing ? "Processing" : "Buy Now"} </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
