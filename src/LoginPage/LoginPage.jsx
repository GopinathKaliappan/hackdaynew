//  Absolute Imports 
       //  Card 

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

        //  Card

// local imports 

import { Link } from 'react-router-dom';
import config from 'config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OtpInput from 'react-otp-input';
import { history } from '../_helpers';
import { initialAction, otpActions } from '../_actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars } from '@fortawesome/free-solid-svg-icons';
import loadingImage from '../assets/images/loading.gif';
import blockImage from '../assets/images/block.svg';



import './style.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

import GetstartedPage from './GetstartedPage/GetstartedPage';


class LoginPage extends React.Component {
    constructor(props) {
        
        super(props);
        // localStorage.setItem('otp', {});
        this.state = {
            phone: '',
            password: '',
            submitted: false,
            initial: {
                isStarted: false,
                isPhoneNumberEntered: false                
            },
            otp: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleOtp = this.handleOtp.bind(this);
        
    }
    
    componentDidMount() {
        if(this.props.otpStatus === 'verified') {
           history.push('/dashboard');
        }
        
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }
    handleOtp(e) {
        const { name, value } = e.target;        
        this.setState({ [name]: value }, () => {
            if(value.length > 3) {
                this.verifyOtp(this.state.otp);
            }                 
        });
    }

    handleState(key) {
        this.setState({
            [key]: true
        })
    }
    componentWillReceiveProps(nextProps) {
        
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
        this.setState({ submitted: true });
        const { phone } = this.state;
        const { dispatch } = this.props;
        if (phone.length === 10) {
            this.props.requestOTP(phone);
        }
    }    
    verifyOtp(otp) {        
        if(config.otp === otp) {                    
            setTimeout(()=> {                
                localStorage.setItem('otp', JSON.stringify({ otpStatus: 'verified',  phone: this.state.phone, category: '' }));
                this.props.changeOTPStatus('verified', { phone: this.state.phone });
                history.push('/dashboard');
            }, 1500)           
        }
    }

    render() {
        const { otpStatus } = this.props;

        const { phone, password, submitted } = this.state;
        return (
            <div className="nopadding">
                    {
                        this.state.otp.length >= 4 && config.otp !== this.state.otp ? 

                        <div 
                            className={'loading-icon white'}
                            onClick={()=> { 
                                this.props.changeOTPStatus('', '')
                                this.setState({
                                    otp: ''
                                })
                            }}
                        >  
                            ****Incorrect OTP Try again
                        </div>: null
                    }                                       
                                  
                    {
                            otpStatus === 'requested' || this.state.otp === config.otp ? 
                            <div>       <span className={'loading-icon'} >
                                <img 
                                        src={loadingImage} 
                                        
                                        alt={'loading'}
                                />
                                   <div className={'loading-text'}> {'Loading ....'}</div>
                                    </span>
                            </div>
                            : 
                            null
                    }
                             
                    {
                            otpStatus === 'requested' ||  otpStatus === '' || otpStatus === undefined   ?
                            <div>
                            <div className={'col-md-6'}>
                            </div>
                            <div className={'col-md-6'}>
                             <div className="login-container">   
                             
                                <form type="submit" onSubmit={this.handleSubmit}>

                                    <div><input type="number" maxLength={'10'} name="phone" placeholder={'Enter Phone Number'} onChange={this.handleChange} required/></div>
                                    
                                    <div><button type="submit" className="btn success">Continue</button></div>                  
                                </form>
                            </div>
                            </div> 
                            </div>: 
                            null
                    }    
                      {
                            otpStatus === 'received' ? 
                            <div>
                            <div className={'col-md-6'}>
                            </div>
                            <div className={'col-md-6'}>
                             <div class="login-container ">   
                             
                                <div className={''}>
                                    
                                    <input 
                                            type={'number'} 
                                            value={this.state.otp} 
                                            name={'otp'} 
                                            maxLength={4}
                                            disabled={this.state.otp === config.otp}
                                            className={'text-center'} 
                                            placeholder={'Enter OTP'}
                                            onChange={this.handleOtp} 
                                    />
                                </div>
                                <div class="btn success">Enter Otp</div> 

                            </div>
                            </div> 
                            </div>: 
                            null
                    }          

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { otpStatus } = state.otp;
      return {
        otpStatus
    };
}

function mapDispatchToProps(dispatch) {
    console.log(otpActions);

     return bindActionCreators({
        requestOTP: otpActions.requestOTP,
        changeOTPStatus: otpActions.changeOTPStatus
    }, dispatch);
}
const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 


//export default connect(mapStateToProps, mapDispatchToProps)()