import React, { createContext, useContext } from "react";

const QualityContext = createContext();

export const useQualities = () => {
  return useContext(QualityContext);
};

const obj = [{ name: "Imran", age: 22 }];

export const QualityProvider = ({ children }) => {
  return (
    <QualityContext.Provider value={obj}>{children}</QualityContext.Provider>
  );
};
