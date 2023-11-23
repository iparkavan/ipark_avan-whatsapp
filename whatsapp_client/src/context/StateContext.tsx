"use client";

import React, { createContext, useContext, useReducer } from "react";

interface props {
  children: React.ReactNode;
  reducer: any;
  initialState: any;
}

const StateContext = createContext();

export const StateProvider: React.FC<props> = ({
  initialState,
  reducer,
  children,
}) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
