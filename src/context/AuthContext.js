import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/Firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for cookie on load
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setCurrentUser(JSON.parse(userCookie));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          accessToken: user.accessToken,
        };
        setCurrentUser(userData);
        Cookies.set("user", JSON.stringify(userData), { expires: 1 / 12 }); // 2 hours
      } else {
        // User is signed out
        setCurrentUser(null);
        Cookies.remove("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 1 / 12 }); // 2 hours
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    Cookies.remove("user");
  };

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    !loading && children,
  );
};
