import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import "./Payment.css";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CheckoutProduct from './CheckoutProduct';
import { getBasketTotal } from "./reducer";
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    //Listener that loads once (payment component loads) and then only when a variable (basket) changes otherwise 
    //New secret whenever something changes from the basket (different amount)
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket)}`
            });
            //Get the secret back from stripe, which allows us to charge the right amount 
            setClientSecret(response.data.clientSecret)
        }
        if(user && getBasketTotal(basket) > 0)
        {
            getClientSecret();
        }
    }, [basket])

    //console.log('The secret is', clientSecret);


    const handleSubmit = async event => {
        //console.log(basket);

        event.preventDefault(); //stops refreshing
        setProcessing(true); //Block you from hitting the button again after its already processing 

        if(!user)
        {
            history.replace('/login');
            return;
        }

        //Confirms client secret 
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation
            //Push the payment into the database
            //Going user's collection, into orders, setting an id, 
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })
            
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            //Push them to orders page to not create a loop 
            history.replace('/orders');
        })
    }
    
    const handleChange = event => {
        //Dynamic alerts when customer is typing card details 
        //Listen for changes in card element
        setDisabled(event.empty); //Disable the button 
        setError(event.error ? event.error.message : "");

    }
    
    return (
        <div className="payment">
            <div className="payment__container">
                <h1> 
                    Checkout ( <Link to="/checkout">{basket?.length} items </Link>)
                </h1>

                {/* Restaurant */}
                <div className="payment__section"> 
                    <div className="payment__title">
                        <h1> McDonalds</h1>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
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

                            <CardElement onChange={handleChange}/> 

                            <div className="payment__priceConatiner">  
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    value={getBasketTotal(basket)/100}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                /> 
                                <button disabled={processing || disabled || succeeded}> 
                                    <span> {processing ? <p> Processing </p> : "Buy Now"} </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
            
        
    )
}

export default Payment
