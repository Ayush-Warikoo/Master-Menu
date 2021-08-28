import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import axios from "../tools/axios";
import { db } from "../tools/firebase";
import { getBasketTotal } from "../reducer/reducer";
import { useStateValue } from "../context/StateProvider";
import "./css/Checkout.css";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);

  //Listener that loads on every render (though does nothing when we have the stripe client secret)
  //New secret whenever something changes from the basket (different amount)
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket)}`,
      });

      //Get the secret back from stripe, which allows us to charge the right amount
      setClientSecret(response.data.clientSecret);
    };
    if (user && getBasketTotal(basket) > 0 && !clientSecret) {
      getClientSecret();
    }
  });

  //console.log('The secret is', clientSecret);

  const handleSubmit = async (event) => {
    //console.log(basket);

    event.preventDefault(); //stops refreshing
    setProcessing(true); //Block you from hitting the button again after its already processing

    if (!user) {
      history.replace("/login");
      return;
    }
    //console.log(clientSecret);
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

        paymentIntent.amount = getBasketTotal(basket);
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

        dispatch({
          type: "EMPTY_BASKET",
        });

        toast.success("Purchase successful!", { autoClose: 1500 });
        //Push them to orders page to not create a loop
        history.replace("/orders");
      })
      .catch((error) => {
        toast.error("Purchase unsuccessful, please try again!", {
          autoClose: 1500,
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
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceConatiner">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  value={getBasketTotal(basket) / 100}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={
                    processing || disabled || succeeded || basket.length == 0
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
