import React from 'react';
import { View, Platform } from 'react-primitives';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native'; // move back to react primitives when v.16 is in
import styles from '../styles/styles';

class Link extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: 1
		}
	}

	render() {
		const {
			children,
			style,
			...other
		} = this.props;


		if(Platform.OS == 'android')
			return(
				<TouchableNativeFeedback
					useForeground={true}
					delayPressIn={0}
					{...other}
					>
					<View>{children}</View>
				</TouchableNativeFeedback>
			);

		if(Platform.OS == 'ios')
			return(
				<TouchableOpacity {...other} >
					<View>{children}</View>
				</TouchableOpacity>
			);

		/*
		return(
			<Touchable
				{...other}
				onPressIn={()=>{
					this.setState({
						opacity: .5
					})
				}}
				onPressOut={()=>{
					this.setState({
						opacity: 1
					})
				}}
				>
					<View
						style={[ style, {
							opacity: this.state.opacity
						}]}
						>
						{children}
					</View>
			</Touchable>
		);
		*/
	}
}


export default Link;