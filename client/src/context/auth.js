import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProviver = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProviver };
