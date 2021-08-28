import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  //Cancel logic required to avoid memory leaks
  useEffect(() => {
    let cancel = false;

    if (user) {
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
          )
        });
    } else {
      setOrders([]);
    }
    return () => {
      cancel = true;
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders.map((order, index) => 
          <Order key={`orders__order_${index}`}order={order} />
        )}
      </div>
    </div>
  );
}

export default Orders;
