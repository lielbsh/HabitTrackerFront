import axios from 'axios';

const apiEndpoint = 'http://localhost:8000'; 

export const register = async (newUserData, setUser) => { 
// input: {userName: '', password: ''}
    try {
        const res = await axios.post(`${apiEndpoint}/register`, newUserData, { withCredentials: true });

        if (res.data.message === 'User registered successfully') {
            // Get the user info (await the promise)
            const userInfo = await getUserInfo();

            setUser(userInfo); // Update global user state
            return userInfo; // Return the user info
        } else {
            console.log(res.data.message);
            return res.data.message;
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return null; 
    }
};

export const logIn = async (userData, setUser) => { // input: {userName: '', password: ''}
    try {
        const res = await axios.post(`${apiEndpoint}/login`, userData, { withCredentials: true });

        if (res.data.message === 'Login successful') {
            // const userId = res.data.userId;

            // Get the user info (await the promise)
            const userInfo = await getUserInfo();

            setUser(userInfo); // Update global user state
            return userInfo; // Return the user info
        } else {
            return res.data.message;
        }
    } catch (error) {
        return null;
    }
};

export const getUserInfo = async () => {
    try {
        const res = await axios.get(`${apiEndpoint}/user`, {
            withCredentials: true,
        });
        console.log('res', res);
        return res.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error; // Rethrow error to be handled in logIn or register
    }
};

export const logout = async (setUser) => {
    try {
        const res = await axios.get(`${apiEndpoint}/logout`, {
            withCredentials: true,
        });
        if (res.status === 200) {
            console.log(res.data.message); // Log success message
            setUser(null); // Clear user state
        }
    } catch (error) {
        console.error('Error logging out:', error);
        throw error; 
    }
};

