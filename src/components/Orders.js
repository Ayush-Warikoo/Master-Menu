import React, { useState, useEffect } from "react";
import { db } from "../tools/firebase";
import { useStateValue } from "../context/StateProvider";
import { throttle } from "lodash";
import ReactLoading from "react-loading";
import "./css/Orders.css";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();
  const [lastOrder, setLastOrder] = useState({ time: null });
  const [isItemsLeft, setIsItemsLeft] = useState(true);

  function isBottom() {
    if (!document.getElementsByClassName("orders")[0]) return false;
    const pageHeight =
      document.getElementsByClassName("orders")[0].clientHeight;
    return Boolean(Math.abs(pageHeight - window.scrollY) <= 1000);
  }

  async function getOrders() {
    if (!user) return [];
    return db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .startAfter(lastOrder.time ? lastOrder.time : Date.now())
      .limit(5)
      .get();
  }

  //Cancel logic required to avoid memory leaks
  useEffect(() => {
    let cancel = false;
    const loadOrders = async () => {
      if (cancel) return null;

      const orders = await getOrders();

      if (orders.docs && orders.docs.length > 0) {
        setOrders((prevOrders) => {
          const newOrders = orders.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          lastOrder.time = newOrders[newOrders.length - 1].data.created;

          if (!prevOrders) {
            return newOrders;
          }
          return [...prevOrders, ...newOrders];
        });
      } else {
        setIsItemsLeft(false);
        setOrders([]);
      }
    };

    //Pulls history if user is signed in
    if (user) {
      loadOrders();
    } else {
      // Since user is undefined to start and can be null for a short time before it is loaded
      setTimeout(() => {
        if (cancel) return null;
        setOrders(null);
      }, 800);
    }

    function handleScroll() {
      //If user is at the bottom of the page and there are more items to load
      if (isBottom() && isItemsLeft && !cancel) {
        loadOrders();
      }
    }

    const throttledScrolls = throttle(handleScroll, 1000);
    window.onscroll = throttledScrolls;

    return () => {
      cancel = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="orders">
      <div className="orders__order">
        {orders === undefined ? ( //orders: undefined
          <div className="orders__initLoad">
            <ReactLoading
              type={"bars"}
              color={"#696969"}
              height={"100px"}
              width={"100px"}
            />
          </div>
        ) : orders && orders.length > 0 ? ( //orders: [{id, data}]
          <h1>Your Orders</h1> &&
          orders.map((order, index) => (
            <Order key={`orders__order_${index}`} order={order} />
          ))
        ) : user && orders && orders.length === 0 ? ( //orders: []
          <h1> No order history, please make a purchase! </h1>
        ) : (
          //orders: null
          <h1> Please log in to view order history! </h1>
        )}
      </div>
      {isItemsLeft && orders && orders.length > 0 && (
        <div className={"orders__newLoad"}>
          <ReactLoading
            type={"bars"}
            color={"#696969"}
            height={"69px"}
            width={"69px"}
          />
        </div>
      )}
    </div>
  );
}

export default Orders;
