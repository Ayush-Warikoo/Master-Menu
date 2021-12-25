export const initialState = {
  allergy: [],
  preference: [],
  budget: null,
  rating: null,
  diet: null,
  basket: JSON.parse(localStorage.getItem("basket") || "[]"),
  user: null,
};

// Selector
let newBasket;
export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => Math.round(item.price * item.quantity * 100) + amount,
    0
  );

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return {
        ...state,
        allergy: action.allergy,
        preference: action.preference,
        budget: action.budget,
        rating: action.rating,
        diet: action.diet,
      };

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

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
