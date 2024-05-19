// Imports
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardContext = createContext({});

export function DashboardContextProvider({ children }) {
  const [showCandidats, setshowCandidats] = useState(false);
  const [showMembreBureau, setshowMembreBureau] = useState(false);
  const [showRecepisse, setshowRecepisse] = useState(false);
  const [showRes, setRes] = useState(false);
  const [showUrne, setshowUrne] = useState(false);

  return (
    <DashboardContext.Provider value={{ showCandidats, setshowCandidats, showMembreBureau, setshowMembreBureau, showRecepisse, setshowRecepisse, showRes, setRes, showUrne, setshowUrne }}>
      {children}
    </DashboardContext.Provider>
  );
}
