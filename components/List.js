import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-primitives';
import { ScrollView } from 'react-native';
import styles from '../styles/styles';

class List extends React.Component {

	render() {
		const {
			children,
			items = [],
			renderItem = ()=>{},
			style,
			variant,
			...other
			} = this.props;

		const variantStyleModifier = (variant) ? `--${variant}` : '';

		const itemsElements = items.map((item, i)=>{
			return (
				<View
					key={i}
					accessibilityRole='listitem'
					style={[styles[`list-item${variantStyleModifier}`], style]}
					>
					{ renderItem(item, i) }
				</View>
			);
		});

		if((Platform.OS == 'android' || Platform.OS == 'ios') && variant == 'hscroll')
			return(
				<ScrollView horizontal>
					{ itemsElements }
					{ children }
				</ScrollView>
			);

		return(
			<View
				accessibilityRole='list'
				style={[styles[`list${variantStyleModifier}`], style]}
				>
				{ itemsElements }
				{ children }
			</View>
		);
	}
}

List.propTypes = {
	variant: PropTypes.oneOf(['grid', 'inline', 'hscroll', '']),
}

export default List;