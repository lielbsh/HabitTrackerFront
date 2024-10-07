import { createContext, useState, useEffect, useContext } from 'react';
import { createHabit, getHabits } from '../scripts/habitScript'; // Combine import statements

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // const [user, setUser] = useState(null); 
    const [habits, setHabits] = useState([]);

    // Fetch habits from backend when the component mounts
    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const habitData = await getHabits();
                if (habitData) {
                    setHabits(habitData.habits); // Set the habit data in state
                }
            } catch (error) {
                console.error('Error fetching habits:', error);
            }
        };
      
        fetchHabits(); // Call the fetch function
    }, []);

    return (
        <DataContext.Provider value={{ habits, setHabits }}>
            {children}
        </DataContext.Provider>
    );
};

// Custom hook to use the DataContext
export const useData = () => {
    return useContext(DataContext);
};
