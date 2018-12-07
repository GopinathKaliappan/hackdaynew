import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { otpActions } from '../_actions';

export class Category extends Component {
	render() {
		return (
			<div 
				onClick={()=> {
					this.props.selectCategory('')
				}}
			>
		
				{this.props.otp.category}
			
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