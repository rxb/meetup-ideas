import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import Icon from './Icon';


class DumbButton extends React.Component {
	render() {
		const {
			shape,
			style = {},
			type = 'primary',
		} = this.props;

		return(
			<View style={[styles.button, ((type == 'secondary') ? styles.buttonSecondary : {}), style]}>
				{ shape &&
					<Icon shape={shape} color="white" />
				}
				<Text style={[styles.text, styles.buttonText, ((type == 'secondary') ? styles.buttonTextSecondary : {}),]}>{this.props.label}</Text>
			</View>
		);
	}
}

export default DumbButton;