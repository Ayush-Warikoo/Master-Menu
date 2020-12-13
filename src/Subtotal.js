import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import { useHistory } from "react-router-dom";

function Subtotal() {
    
    const history = useHistory();

    const [{basket}, dispatch] = useStateValue();

    const details = () => {
        //Adds restaurants based on checkout id
        //Each restaurant takes 100 numbers starting from 10000000
        //Order: McDonalds, PizzaPizza, ...

        let restaurantSet = new Set();

        for (const item of basket)
        {
            if(item.id < 10000100)
            {
                restaurantSet.add("McDonalds");
            }
            else if(item.id < 10000200)
            {
                restaurantSet.add("PizzaPizza");
            }
        }

        let restaurantArray = [];

        for(const rest of restaurantSet)
        {
            restaurantArray.push(<h3> {rest} </h3>);
            restaurantArray.push(<label for="location">Location:</label>);
            restaurantArray.push(<input type='text' id="location" />);
            restaurantArray.push(<label for="appt">Reservation Time:</label>);
            restaurantArray.push(<input type="time" id="appt" name="appt" min="09:00" max="18:00" required/>);
        }

        return restaurantArray; 
    }

    return( 
    <div className="subtotal">
        <CurrencyFormat
            renderText={(value) => (
                <p>
                    Subtotal ({basket.length} items): <strong>{value} </strong>
                </p>
            )}
            value={getBasketTotal(basket)/100} 
            decimalScale={2}
            fixedDecimalScale={true}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
        />
        <div className="details">
            {details()}
        </div> 

        <button onClick={e => history.push('/payment')}> Proceed to Checkout</button>
    </div>
    )
}

export default Subtotal;
