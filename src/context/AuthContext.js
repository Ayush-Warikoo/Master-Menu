import React, { createContext, useReducer, useContext } from "react";

export const initAuthState = {
  user: null,
};

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useReducer(authReducer, initAuthState)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
