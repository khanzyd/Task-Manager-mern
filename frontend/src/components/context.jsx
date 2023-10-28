import React, { useContext, useState } from "react"

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser] = useState(undefined)


    return <AppContext.Provider 
    value= {{
        isLoggedIn,
        user,
        setIsLoggedIn,
        setUser
    }}>
        {children}
    </AppContext.Provider>
}


// Custom Hook
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext , AppProvider}