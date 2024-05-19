import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState("Tableau de bord");
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(true);
    return (
        <SidebarContext.Provider value={{ selectedMenu, setSelectedMenu, isSideBarExpanded, setIsSideBarExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
};