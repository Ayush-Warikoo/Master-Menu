import React, { useState, useEffect } from "react";
import { db } from "../tools/firebase";
import { useStateValue } from "../context/StateProvider";
import "./css/Orders.css";
import Order from "./Order";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  //Cancel logic required to avoid memory leaks
  useEffect(() => {
    let cancel = false;

    //Pulls history if user is signed in
    if (user) {
      //setWasLoggedIn(true);
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .limit(20)
        //Real time update
        .onSnapshot((snapshot) => {
          if (cancel) return;
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders(null);
    }

    if (loading) {
      setLoading(false);
    }

    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="orders">
      <div className="orders__order">
        {orders && orders.length > 0
          ? <h1>Your Orders</h1> &&
            orders.map((order, index) => (
              <Order key={`orders__order_${index}`} order={order} />
            ))
          : user
          ? loading || <h1> No order history, please make a purchase! </h1>
          : loading || <h1> Please log in to view order history! </h1>}
      </div>
    </div>
  );
}

export default Orders;
