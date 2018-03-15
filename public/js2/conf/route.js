//const serverUrl = 'http://rha-backend.herokuapp.com/';
const serverUrl = 'http://localhost:5000/';

const userAPIMethods = {
    login: 'users/auth',
    signup: 'users/create',
    logout: 'users/logout',
    user: 'users/info',
    updateUser: 'users/change',
    leaderBoard: 'users/rating',
};

export const route = {
    debug: true
};

export default {serverUrl, userAPIMethods};