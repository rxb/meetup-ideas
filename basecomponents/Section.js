import React from 'react';
import { View } from 'react-native';
import styles from '../styles/styles';

const Section = (props) => {

	const {
		children,
		style,
	} = props

	return(
		<View style={[styles.section, style]}>
			{children}
		</View>
	);
}


export default Section;