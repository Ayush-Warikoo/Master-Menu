import React, { createContext, useReducer, useContext } from "react";

export const initFilterState = {
  allergy: [],
  preference: [],
  budget: null,
  rating: null,
  diet: null,
};

export const FilterContext = createContext();

const filterReducer = (state, action) => {
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

    default:
      return state;
  }
};

export const FilterContextProvider = ({ children }) => {
  return (
    <FilterContext.Provider value={useReducer(filterReducer, initFilterState)}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
