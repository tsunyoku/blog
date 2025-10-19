import React from "react";
import { User } from "./models/User";

export interface Context {
  darkMode: boolean;
  user: User | null;
  lastUserCheck: number | null;
}

export type ContextType = {
  context: Context;
  setContext: (context: Context) => void;
};

export const ReactContext = React.createContext<ContextType | undefined>(undefined);

export const useContext = () => {
  const context = React.useContext(ReactContext);
  if (context === undefined) {
    throw new Error("fuck");
  }

  return context;
}

interface Props {
  children: React.ReactNode;
}

const contextKey = "context";
const defaultContext: Context = {
  darkMode: false,
  user: null,
  lastUserCheck: null,
};

export const setContextInLocalStorage = (context: Context) => {
  localStorage.setItem(contextKey, JSON.stringify(context));
};

export const fetchContext = () => {
  const context = localStorage.getItem(contextKey);
  return context !== null ? JSON.parse(context) as Context : defaultContext;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [context, setContext] = React.useState<Context>(fetchContext());
  return (
    <ReactContext.Provider
      value={{
        context,
        setContext: (value: React.SetStateAction<Context>) => {
          setContextInLocalStorage(value as Context);
          setContext(value);
        },
      }}
    >
      {children}
    </ReactContext.Provider>
  );
};