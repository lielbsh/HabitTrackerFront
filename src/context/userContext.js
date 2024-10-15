import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => getFromLocalStorage('userData') || null ); // Store user data globally
    
    useEffect(() => {
        // Save data to Local Storage whenever it changes
        saveToLocalStorage('userData', user);
      }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the DataContext
export const useUserData = () => {
    return useContext(UserContext);
};


// Helper functions to save and get data from local storage
const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
    };
  