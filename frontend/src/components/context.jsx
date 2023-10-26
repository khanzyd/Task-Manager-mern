import React, { useContext, useState } from "react"

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return <AppContext.Provider value= {{
        isLoggedIn,
        setIsLoggedIn
    }}>
        {children}
    </AppContext.Provider>
}


// Custom Hook
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext , AppProvider}