import { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user data globally
    const [habits, setHabits] = useState({
        daily: [],
        weekly: [],
        monthly: [],
      });
    return (
        <UserContext.Provider value={{ user, setUser, habits, setHabits }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the DataContext
export const useUserData = () => {
    return useContext(UserContext);
};
