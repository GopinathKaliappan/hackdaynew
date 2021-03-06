import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    sendOtp,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    let user = { firstName: username, lastName: 'Kaliappan',  username: username, password: password, token: '54asdasdsadsad' };
    // return user;

       return fetch(`https://reqres.in/api/users/2`)
       //return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // console.log('JSON.stringify(users)');
            console.log(users);
            user = { ...user, ...users };            
            localStorage.setItem('user', JSON.stringify(user));
            
            // }
            let otp = '1234';
            return otp;
        });

         // return user;
}
function sendOtp(phone) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
    };
    let user = { phone: phone, lastName: 'Kaliappan',  username: phone, password: '', token: '54asdasdsadsad' };
    // return user;

       return fetch(`https://jsonplaceholder.typicode.com/todos/1`)
       //return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(users => {
            // console.log('JSON.stringify(users)');
            console.log(users);
            user = { ...user, ...users };            
            localStorage.setItem('user', JSON.stringify(user));
            config.otp = '1234';

            // }
                
            return user;
        });

         // return user;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}