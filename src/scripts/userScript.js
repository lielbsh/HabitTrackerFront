import axios from 'axios';

const apiEndpoint = 'http://localhost:8000'; // Replace with your API endpoint

export const getUserWithDetails = async (userId) => {
    try {
        const response = await axios.get(`${apiEndpoint}/users/${userId}`); // Adjust the endpoint as needed
        return response.data; // Return the user data, including habits and analytics
    } catch (error) {
        console.error('Error fetching user with details:', error);
        return null; // Handle the error appropriately
    }
};