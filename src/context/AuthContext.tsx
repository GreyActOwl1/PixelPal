import { InterfaceContextType, InterfaceUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";
import { boolean } from "zod";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<InterfaceContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<InterfaceUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthUser = async () => {
    // TODO: Replace this with your authentication logic.
    setIsLoading(true);
    // const user = await fetchUser();
    // if (user) {
    //   setUser(user);
    //   setIsAuthenticated(true);
    // }
    setIsLoading(false);
    return isAuthenticated;
  };
  const value = {
    user,
    isLoading,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
