import fetch from "isomorphic-unfetch";
import { createContext, useEffect, useState } from "react";
import { baseURL } from "../utils/constants";
import { ModifiedUserData } from "../utils/randomTypes";

type authValues = {
  isAuthenticated: boolean;
  userData: ModifiedUserData | null;
  toggleAuth: (value: boolean) => void;
  changeUserData: (data: ModifiedUserData) => void;
};

export const AuthContext = createContext({} as authValues);

interface authContextProps {}

const AuthContextProvider: React.FC<authContextProps> = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<null | ModifiedUserData>(null);

  const toggleAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const changeUserData = (data: ModifiedUserData) => {
    setUserData(data);
  };

  useEffect(() => {
    const func = async () => {
      const response = await fetch(`${baseURL}/api/is-authenticated`);
      const res = await response.json();
      console.clear();
      if (res.token) {
        toggleAuth(true);
      } else {
        toggleAuth(false);
      }
    };
    func();
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, toggleAuth, userData, changeUserData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
