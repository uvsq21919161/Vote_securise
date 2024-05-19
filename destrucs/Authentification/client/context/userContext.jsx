// Imports
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

/**
 * Fonction qui donne accès au dashboard si un
 * token existe. Sinon, va sur la page home.
 *
 * @param children - Composant react
 */
export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        if (data) {
          navigate("/dashboard");
        }
      });
    }
  }, []);
  return (
    <UserContext.Provider value={(user, setUser)}>
      {children}
    </UserContext.Provider>
  );
}
