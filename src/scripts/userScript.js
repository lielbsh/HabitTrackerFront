import axios from 'axios';

const apiEndpoint = 'http://localhost:8000'; // Replace with your API endpoint

export const logIn = async (userData) => { // input: {userName: '', password: ''}
    return await axios.post(`${apiEndpoint}/login`, userData) 
            .then(res => {
                console.log('the res.data', res.data)
                if (res.data.message == 'Login successful') {
                    // getUserInfo
                    console.log('yayy')
                    const userId = res.data.userId;
                    return getUserInfo(userId);
                } else {
                    console.log(res.data.message);
                    console.log('res.data.message', res.data.message)
                    return res.data.message;
                }
            })
    .catch (error => {
        console.error('Error fetching user with details:', error);
        return null; // Handle the error appropriately
    })
};

// logIn({userName: 'testuser', password: '$2a$10$66tLB6hjs7jRluy0NFNMpebBfziOf.DwVvsSac7M4TQ3IeytHZHCi'});

export const getUserInfo = async (id) => {
    return await axios.get(`${apiEndpoint}/login`, {
        params: { userId: id }, 
    })
        .then( res => {
            console.log('res', res)
            return(res.data)
        }) 

};