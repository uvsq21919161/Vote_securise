// Imports
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
  const [selectCandidat, setSelectCandidat] = useState(999);
  const [selectCandidatName, setSelectCandidatName] = useState("");
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, selectCandidat, setSelectCandidat, selectCandidatName, setSelectCandidatName }}>
      {children}
    </UserContext.Provider>
  );
}
