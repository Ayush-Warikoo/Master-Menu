import React, { createContext, useReducer, useContext } from "react";

export const initBasketState = {
  basket: JSON.parse(localStorage.getItem("basket") || "[]"),
};

export const BasketContext = createContext();

export const getBasketTotalCost = (basket) =>
  basket?.reduce(
    (amount, item) => Math.round(item.price * item.quantity * 100) + amount,
    0
  );

export const getBasketTotalQuantity = (basket) =>
  basket.reduce((acc, curr) => acc + curr.quantity, 0);

const basketReducer = (state, action) => {
  let newBasket;
  switch (action.type) {
    case "ADD_TO_BASKET":
      //if item is already in basket, increase the quantity
      newBasket = [...state.basket];
      const indexAdd = newBasket.findIndex(
        (item) => item.id === action.item.id
      );
      if (indexAdd >= 0) {
        newBasket[indexAdd] = {
          ...newBasket[indexAdd],
          quantity: newBasket[indexAdd].quantity + 1,
        };
      } else {
        newBasket.push({ ...action.item, quantity: 1 });
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket,
      };

    case "EMPTY_BASKET":
      newBasket = [];
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket,
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export const BasketContextProvider = ({ children }) => {
  return (
    <BasketContext.Provider value={useReducer(basketReducer, initBasketState)}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => useContext(BasketContext);
