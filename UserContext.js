import React, { createContext, useState, useMemo } from "react";

const UserType = createContext();

const UserContext = ({ children }) => {
    const [userId, setUserId] = useState("");
    const value = useMemo(() => ({ userId, setUserId }), [userId, setUserId]);
    return (
        <UserType.Provider value={value}>
            {children}
        </UserType.Provider>
    )
}

export { UserType, UserContext }