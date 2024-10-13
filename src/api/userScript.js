// import axios from 'axios';

// const apiEndpoint = 'http://localhost:8000'; 


// export const register = async (newUserData, setUser) => { // input: {userName: '', password: ''}
//     return await axios.post(`${apiEndpoint}/register`, newUserData) 
//             .then(res => {
//                 if (res.data.message === 'User registered successfully') {
//                     console.log('yayy')
//                     const userId = res.data.userId;
                    
//                     // Get the user info
//                     const userInfo = getUserInfo(userId);
//                     console.log('Retrieved userInfo:', userInfo);
//                     setUser(userInfo) // Update global user state
//                     return userInfo; // Return the user info

//                 } else {
//                     console.log(res.data.message);
//                     return res.data.message;
//                 }
//             })
//     .catch (error => {
//         console.error('Error fetching user with details:', error);
//         return null; // Handle the error appropriately
//     })
// };


// export const logIn = async (userData, setUser) => { // input: {userName: '', password: ''}
//     return await axios.post(`${apiEndpoint}/login`, userData) 
//             .then(res => {
//                 if (res.data.message === 'Login successful') {
//                     console.log('yayy Login successful')
//                     const userId = res.data.userId;
//                     console.log(userId)
//                     // Get the user info
//                     const userInfo = getUserInfo(userId); // !!!!
//                     console.log('Retrieved userInfo:', userInfo);
//                     setUser(userInfo) // Update global user state
//                     return userInfo; // Return the user info

//                 } else {
//                     console.log(res.data.message);
//                     return res.data.message;
//                 }
//             })
//     .catch (error => {
//         console.error('Error fetching user with details:', error);
//         return null; // Handle the error appropriately
//     })
// };


// export const getUserInfo = async (id) => {
//     return await axios.get(`${apiEndpoint}/login`, {
//         headers: {
//             'user-id': id
//         }
//     }) 
    
//     .then( res => {
//         console.log('res.data', res.data)
//         return(res.data)
//     }) 
//     .catch(error => {
//         console.error('Error fetching user info:', error);
//         throw error; // Rethrow error to be handled in logIn
//     });
// };


import axios from 'axios';

const apiEndpoint = 'http://localhost:8000'; 

export const register = async (newUserData, setUser) => { // input: {userName: '', password: ''}
    try {
        const res = await axios.post(`${apiEndpoint}/register`, newUserData);
        
        if (res.data.message === 'User registered successfully') {
            console.log('yayy');
            const userId = res.data.userId;

            // Get the user info (await the promise)
            const userInfo = await getUserInfo(userId);
            console.log('Retrieved userInfo:', userInfo);

            setUser(userInfo); // Update global user state
            return userInfo; // Return the user info
        } else {
            console.log(res.data.message);
            return res.data.message;
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return null; // Handle the error appropriately
    }
};

export const logIn = async (userData, setUser) => { // input: {userName: '', password: ''}
    try {
        const res = await axios.post(`${apiEndpoint}/login`, userData);

        if (res.data.message === 'Login successful') {
            console.log('yayy Login successful');
            const userId = res.data.userId;
            console.log(userId);

            // Get the user info (await the promise)
            const userInfo = await getUserInfo(userId);
            console.log('Retrieved userInfo:', userInfo);

            setUser(userInfo); // Update global user state
            return userInfo; // Return the user info
        } else {
            console.log(res.data.message);
            return res.data.message;
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return null; // Handle the error appropriately
    }
};

export const getUserInfo = async (id) => {
    try {
        const res = await axios.get(`${apiEndpoint}/user/${id}`, {
            headers: {
                'user-id': id
            }
        });
        console.log('res.data', res.data);
        return res.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error; // Rethrow error to be handled in logIn or register
    }
};

