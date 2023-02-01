import React, { createContext, useContext, useState } from "react";
import { LoggedInUserDataType } from "../../types/user";

type AuthContextType = {
  user: LoggedInUserDataType;
  login: (userData: LoggedInUserDataType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      let userProfile = localStorage.getItem("userProfile");
      if (userProfile) {
        return JSON.parse(userProfile);
      }
    }
    return null;
  });

  const login = (userData: LoggedInUserDataType) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
