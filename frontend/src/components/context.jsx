import React, { useContext, useState } from "react"
import {useCookies} from "react-cookie"

const AppContext = React.createContext();

const AppProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser] = useState(undefined);
    const [cookie,setCookie,removeCookie] = useCookies(["jwtToken",undefined]);
    const [tokenInfo,setTokenInfo] = useState(undefined);
    const [tokenExpiry,setTokenExpiry] = useState(undefined);


    return <AppContext.Provider 
    value= {{
        isLoggedIn,
        user,
        cookie,
        tokenInfo,
        tokenExpiry,
        setIsLoggedIn,
        setUser,
        setCookie,removeCookie,
        setTokenInfo,
        setTokenExpiry,
    }}>
        {children}
    </AppContext.Provider>
}


// Custom Hook
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext , AppProvider}