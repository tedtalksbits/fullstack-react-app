import React, { useContext, useState } from 'react'

//create context 
const UserContext = React.createContext();

//custom hook 
export function useUser() {
   return useContext(UserContext)
}

//Provider 
export const UserProvider = ({ children }) => {
   const [user, setUser] = useState({})


   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   )
}

