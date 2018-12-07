import React from 'react';
import { Router, Route, Link, Switch         } from 'react-router-dom';
import { connect } from 'react-redux';
import config from 'config';


//  font awesome configuration 

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee  } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee);

//  font awesome configuration 

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import MainComponent from './MainContainer/MainContainer';
import SideBar from '../SideBar/SideBar';
import  './App.css';

const Header = (props) => (
    <div> 
        <div>  

            <h4>Neusis</h4>
            <p>Digitize your Values</p> 
        </div>
    </div>
);
    
const RouterItems = [
    {
        name: 'Login Page',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        component: SideBar
    },
    {
        name: 'Home Page',
        path: '/',
        component: HomePage
    },
    {
        name: 'Register',
        path: '/register',
        component: RegisterPage
    }
]

class App extends React.Component {
    constructor(props) {
        console.log(config.apiUrl)
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, loggedIn, otpStatus } = this.props;
        return (        

            <div className="text-center">                 
                 <Router history={history}>
                        <div> 
                                <Switch>
                                <Route key={'login'} name={'login'} path={'/login'} component={LoginPage} />                                   
                                <Route key={'Dashboard'} path={'/dashboard'} component={SideBar} />    
                                <Route key={'Register'} path={'/register'} component={RegisterPage} />                                
                                <Route key={'login'} name={'login'} path={'/'} component={LoginPage} />                                
                                </Switch>
                        </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    const { authentication } = state;
    const { otpStatus } = state.otp;
    console.log(authentication);
    return {
        alert,
        otpStatus,
        loggedIn: authentication.loggedIn
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 