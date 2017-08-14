import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import Icon from './Icon';


class DumbButton extends React.Component {
	render() {
		const {
			shape,
			style = {},
			size = 'normal',
			type = 'primary',
		} = this.props;

		return(
			<View style={[
				styles.button,
				((type == 'secondary') ? styles.buttonSecondary : {}),
				((size == 'small') ? styles.buttonSmall : {}),
				style
			]}>
				{ shape &&
					<Icon shape={shape} color="white" />
				}
				<Text style={[
					styles.text,
					styles.buttonText,
					((type == 'secondary') ? styles.buttonTextSecondary : {}),
					((size == 'small') ? styles.buttonTextSmall : {}),
				]}>{this.props.label}</Text>
			</View>
		);
	}
}

export default DumbButton;