import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isSideBarExpanded, setIsSideBarExpanded] = useState(true);
    return (
        <SidebarContext.Provider value={{ isSideBarExpanded, setIsSideBarExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
};