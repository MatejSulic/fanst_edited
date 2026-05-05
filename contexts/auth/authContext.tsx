import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoggedInUserDataType } from "../../types/user";
import { useQueryClient } from "@tanstack/react-query";

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData: LoggedInUserDataType) => {
    queryClient.clear();
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    // console.log("logout");
    localStorage.removeItem("user");
    queryClient.clear();
    setUser(null);
    router.push("/login");
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
