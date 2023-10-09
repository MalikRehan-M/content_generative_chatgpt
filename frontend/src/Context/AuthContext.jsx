import { createContext,useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}) {
    const [authState,setAuthState]=useState({isAuth:false,token:null});
    
    const loginUser=(val)=>{
        setAuthState({isAuth:true,token:val});
    }
    const logoutUser=()=>{
        setAuthState({isAuth:false,token:null})
    }
    return (
        <AuthContext.Provider value={{authState,loginUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
