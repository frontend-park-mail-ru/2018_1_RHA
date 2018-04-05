
const serverUrl = 'https://rha-backend.herokuapp.com/';
//const serverUrl = 'http://localhost:5000/';

/**
 * Contains methods' paths of user API
 * @type {{login: string, signup: string, logout: string, user: string, updateUser: string, leaderBoard: string}}
 */
const userAPIMethods = {
    login: 'users/auth',
    signup: 'users/create',
    logout: 'users/logout',
    user: 'users/info',
    updateUser: 'users/change',
    leaderBoard: 'users/rating',
};

// export const route = {
//     debug: true
// };

export default {serverUrl, userAPIMethods};