"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface ReducProviderProps {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<ReducProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
