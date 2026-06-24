import {createContext, useContext, useState} from "react"; 

export const AppContext = createContext({});

export const AppContextProvider = (props : any) => {
    const value = {

    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}