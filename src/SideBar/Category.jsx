import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import phone from '../assets/images/phone.svg';
import { otpActions } from '../_actions';

var t = [1,2,3,4,5,6,7,8,9];
export class Category extends Component {
	render() {
		return (
			<div 
				onClick={()=> {
					this.props.selectCategory('')
				}}
			>
			{
				t.map(data => (
					<Card className={'custom-card-item'}>
						<img src={phone} alt={'image'} />
						<div style={{ textAlign: 'left' }}>
							<span style={{ marginLeft: '10px' }}>{'Iphone S'}</span>
						</div>
						<div style={{ textAlign: 'left' }}>
							<span style={{ marginLeft: '10px' }}>{'Apple Inc'}</span>
						</div>
						<div style={{ textAlign: 'left' }}>
							<span style={{ marginLeft: '10px' }}>{'Current Owner '} {' Apple Inc'}</span>
						</div>							
					</Card>
				))
			}
			
			</div>
		)
	}
}


const mapStateToProps  = (state) => {
	const { otp } = state;
	return {
		otp
	}
}

const mapDsipatchToProps = (dispatch) => {
	return bindActionCreators({
		selectCategory: otpActions.selectCategory
	}, dispatch);
} 
export default connect(mapStateToProps, mapDsipatchToProps)(Category);