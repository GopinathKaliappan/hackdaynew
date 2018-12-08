import { userConstants } from '../_constants';
import { otpService } from '../_services';
import { history } from '../_helpers';
import config from 'config';


function changeOTPStatus(otpStatus, userID) { 
        return { 
            type: userConstants.CHANGE_OTP_STATUS, 
            payload: { 
                otpStatus, 
                userID,
                category: ''
            } 
        };
}

function selectCategory(category) { 
        return { 
            type: userConstants.SELECT_CATEGORY, 
            payload: { 
                category                
            } 
        };
}

function requestOTP(phone) {

    

    return dispatch => {
        // dispatch(request({ phone }));
        dispatch(changeOTPStatus('requested'));
        
        otpService.requestOTP(phone)
            .then(
                user => {
                    if(user.user_id) {

                        dispatch(changeOTPStatus('received', user.user_id));
                        config.otp = '1234';  
                    }
                    else {
                        
                        dispatch(changeOTPStatus('received', {}));
                        config.otp = '2545';    
                    }                    
                },
                error => {

                }
            );
    };


}




export const otpActions = {
    requestOTP,
    changeOTPStatus ,
    selectCategory
};