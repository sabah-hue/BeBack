import { createContext, useState } from 'react';


export const ChatContext = createContext({})

export const ChatContextProvider = ( {children} ) => {
    const [user, setUser] = useState({
        name: "sabah",
    });
    return <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
}
