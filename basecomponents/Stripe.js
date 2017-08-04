import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/styles';

const Stripe = (props) => {

	const {
		children,
		image,
		style = {},
	} = props

	if(image){
		return(
			<Image
				source={{uri: image}}
				style={[styles.stripe, {resizeMode: 'cover'}, style]}
				>
				{children}
			</Image>
		);
	}
	else{
		return(
			<View style={[styles.stripe, style]}>
				{children}
			</View>
		);
	}

}


export default Stripe;