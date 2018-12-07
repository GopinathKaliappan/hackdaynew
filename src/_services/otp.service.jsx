import config from 'config';
import { authHeader } from '../_helpers';
import axios from 'axios';
import { otpActions } from '../_actions';



// function requestOTP(phone) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone })
//     };
//     let user = { phone: phone, lastName: 'Kaliappan',  username: phone, password: '', token: '54asdasdsadsad' };
//     // return user;

//        return fetch(`neusisapi.heptagon.tech/app/login`, )
//        //return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
//         .then(()=> console.log('success'))
//         .then(users => {
//             // console.log('JSON.stringify(users)');
//             console.log(users);
//             user = { ...user, ...users };            
            
//             config.otp = '1234';

//             // }
                
//             return user;
//         });

//          // return user;
// }

function requestOTP(phone) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
    };
    alert(phone)
    let user = { phone: phone, lastName: 'Kaliappan',  username: phone, password: '', token: '54asdasdsadsad' };
    // return user;

       return axios.post('http://neusisapi.heptagon.tech/app/login', {
            mobile_no: phone,
            password: '1234'
              })
              .then(function (response) {
            //    console.log('JSON.stringify(users)');
            //    console.log(users);
                config.otp = '1234';
                let user = { ...user, ...response.data };                                           
                return user;
                
                
              })
              .catch(function (error) {
                return error;
              });
         // return user;
}

// function verifyOtp() {
    
// }

export const otpService = {
    requestOTP,
};