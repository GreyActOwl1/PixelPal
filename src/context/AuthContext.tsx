import { getCurrentUser } from "@/lib/appwrite/api";
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
   try {
    
      const currentUser = await getCurrentUser();

      if(currentUser){
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
        });
        setIsAuthenticated(true);
        return true;
      }
    }
    catch (error) {
      console.error(error);
      return false;
    }
    finally {
      setIsLoading(false);
    }
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
