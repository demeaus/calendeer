import { createContext, useContext } from "react";

/**
 * Make user information global
 * Setting up authentication with the Context API allows scaling to include authentication and authorization
 */

const TEMP_USER = {
  id: 5,
  email: "a@g.com",
};

const AuthContext = createContext();

function AuthProvider({ children }) {
  const user = TEMP_USER;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext used outside of AuthProvider.");
  }
  return context;
}

export { AuthProvider, useAuth };
