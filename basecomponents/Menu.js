import React from 'react';
import { View, Touchable } from 'react-native';
import styles from '../styles/styles';
import Link from './Link';

const Menu = (props) => {

	const {
		children,
		...other
	} = props;

	return(
		<Touchable>
			{...other}
			>
			{children}
		</Touchable>
	);
}


export default Menu;