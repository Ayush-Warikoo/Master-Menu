import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import { useHistory } from "react-router-dom";

function Subtotal() {
    
    const history = useHistory();

    const [{basket}, dispatch] = useStateValue();

    return <div className="subtotal">
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

        <button onClick={e => history.push('/payment')}> Proceed to Checkout</button>
    </div>
}

export default Subtotal;
