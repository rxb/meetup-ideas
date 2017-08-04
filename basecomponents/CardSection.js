import React from 'react';
import { View } from 'react-native';
import styles from '../styles/styles';

const CardSection = (props) => {
	const {
		children,
		style,
		...other
	} = props;

	return(
		<View style={[styles.cardSection, style]}>
			{children}
		</View>
	);
}


export default CardSection;