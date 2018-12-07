import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCoffee, 
  faBars, 
  faWrench, 
  faPowerOff,
  faMobile,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import { bars } from '@fortawesome/free-solid-svg-icons';
import Card from '@material-ui/core/Card';


import { bindActionCreators } from 'redux';
import { history } from '../_helpers';
import { otpActions } from '../_actions';



import { Route, Link } from 'react-router-dom';
import { NavPane, NavPaneItem, Text } from 'react-desktop/windows';
import MainContainer from '../App/MainContainer/MainContainer'; 


import Title from './title';
import './style.css';


import phone from '../assets/images/phone.svg';
import washingMachine from '../assets/images/washingmachine_new.svg';
import pc from '../assets/images/pc_new.svg';
import laptop from '../assets/images/laptop_new.svg';
import headPhone from '../assets/images/headphone_new.svg';
import printer from '../assets/images/printer_new.svg';
import tv from '../assets/images/tv_new.svg';

import CategoriesComponent from './Category';


const menus = {
  items: ['itemOne', 'itemTwo', 'itemThree', 'itemFour' ],
  itemOne: { 
    name: 'Home', 
    icon: 'google'
  },
  itemTwo: { 
    name: 'Dashboard', 
    icon: 'google'
  },
  itemThree: { 
    name: 'Settings', 
    icon: 'yahoo'
  },
  itemFour: { 
    name: 'Log out', 
    icon: 'logout'
  }      
}


const dashboardItems = {
  items: [
  'mobile', 
  'laptop', 
  'printer', 
  'fridge', 
  'tv', 
  'washingMachine',
  'tablets'
  ],
  mobile: {
    name: 'Mobile Phones',
    id: 'mob',
    icon: phone
  },
  laptop: {
    name: 'Laptop',
    id: 'lap',
    icon: laptop
  },
  printer: {
    name: 'Printer',
    id: 'printer',
    icon: printer
  },
  tv: {
    name: 'TV',
    id: 'tv',
    icon: tv
  },
  washingMachine : {
    name: 'Washing Machine',
    id: 'wm',
    icon: washingMachine
  },
  tablets : {
    name: 'Tablets',
    id: 'tab',
    icon: phone
  },
  fridge : {
    name: 'fridge',
    id: 'fridge',
    icon: phone
  }             
}
const Dashboard = (props) => (
    <div>  
      <div className={'category-text font-bold'}> 
              <h4>Categories</h4>
              <button className={'success add-new-button'}><span><FontAwesomeIcon icon={faPlusCircle} />&nbsp;New</span></button>
      </div>   
      <div className={'row'} style={{ width: '80%', margin: '0px auto' }}> 
            {
              dashboardItems.items.map(item => (

                  <div 
                    className={'col-md-3'} 
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                    onClick={() => {
                      props.selectCategory(item);
                    }}
                  >
                      <Card className={'cards-custom'}>
                         
                          <div>
                              <img src={dashboardItems[item].icon} className={'item-icon'} alt={dashboardItems[item].name}/>
                          </div>
                          <div style={{ marginTop: '10px' }}>
                            {dashboardItems[item].name}
                          </div>
                      </Card>
                  </div>
              ))
            }          
      </div>
    </div>
);

 class SideBar extends Component {

  constructor() {
    super();
    this.state = {
      selected: 'itemOne',
      isOpened: false
    }
    this.renderItem = this.renderItem.bind(this);
  }
  componentWillMount() {
    if(this.props.otpStatus === 'verified') {
        history.push('/dashboard');
    } else {
        history.push('/login');
    }   
  }  
  render() {
    return (
      <div style={{ borderRight: '1px solid grey' }}>
          <div onClick={()=> { this.setState({isOpened: !this.state.isOpened})}} >

            <FontAwesomeIcon 
                icon={faBars}   
                className={'common-icon'}
            />
          </div>
      <NavPane 
          openLength={500} 
          push 
          icon={this.renderIcon('itemOne')}
          color={this.props.color} 
          theme={this.props.theme}
          defaultIsPaneExpanded={false}
          canPaneToggle={this.state.isOpened}
      >
        { this.renderItem('itemOne', 'Content 1') }
        { this.renderItem('itemTwo', 'Content 2') }
        { this.renderItem('itemThree', 'Content 3') }
        { this.renderItem('itemFour', 'Content 3') }
      </NavPane>
      </div>
    );
  }

  renderItem(title, content) {
    return (
      <NavPaneItem
        title={<Title title={menus[title].name}/> }
        icon={this.renderIcon(title)}
        theme="light"
        background="#ffffff"
        selected={this.state.selected === title}
        onSelect={() => this.setState({ selected: title })}
        padding="10px 20px"
        push
      >
            
            
            {
              this.props.category === '' ? <Dashboard selectCategory={this.props.selectCategory} /> : <CategoriesComponent />
            }
            
      </NavPaneItem>
    );
  }

  renderIcon(name) {
    const fill = this.props.theme === 'dark' ? '#ffffff' : '#000000';

    switch(name) {
    case 'itemOne':
      return (
        <div>
        <FontAwesomeIcon icon={['fab', menus[name].icon]} />           
        <span className={'ml-10'}>{ !this.state.isOpened ? menus[name].name : '' }</span>
            
        </div>
      );
    case 'itemTwo':
      return (
       <div>   
         <FontAwesomeIcon icon={['fab', menus[name].icon]} />           

            <span className={'ml-10'}>{ !this.state.isOpened ? menus[name].name : '' }</span>
        </div>
      );
    case 'itemThree':
      return (
        <div>
             <FontAwesomeIcon icon={['fab', menus[name].icon]} />           
            <span className={'ml-10'}>{ !this.state.isOpened ? menus[name].name : '' }</span>

        </div>
      );
    case 'itemFour':
      return (
      <div onClick={() => { 
          let data = { otpStatus: '', phone: '' };
          localStorage.setItem('otp',  JSON.stringify(data));
          this.props.changeOTPStatus('',  '' );  
          setTimeout(()=> {
            this.props.changeOTPStatus('',  '' );  
          }, 300);
          history.push('/login');
      }}>
        <Route render={({ history}) => (
    
    <FontAwesomeIcon 
        icon={faPowerOff} 
        
    />


  )} />
  
          <span className={'ml-10'}>{ !this.state.isOpened ? menus[name].name : '' }</span>        
      </div>
    

    );
    }
  }
}


const mapStateToProps = (state) => {
  const { otp  } = state;
  return {
      otpStatus: otp.otpStatus,
      category: otp.category
  }
};

function mapDispatchToProps(dispatch) {
    console.log(otpActions);

     return bindActionCreators({
        requestOTP: otpActions.requestOTP,
        changeOTPStatus: otpActions.changeOTPStatus,
        selectCategory: otpActions.selectCategory
    }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(SideBar);