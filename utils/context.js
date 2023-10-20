import React, { useContext, createContext } from "react";

export const createDefaultContext = (name, hook) => {
  const Context = createContext(null);

  Context.displayName = name;

  const Provider = ({ children }) => {
    const value = hook();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContextHook = () => {
    const context = useContext(Context);
    if (context === null) {
      throw new Error(
        `use${name}Context must be used within a ${name}Provider`
      );
    }
    return context;
  };

  return {
    Provider,
    useContextHook,
  };
};
