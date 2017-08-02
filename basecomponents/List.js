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
			hscrollItemStyle = {},
			hscrollContainerStyle = {},
			style,
			variant,
			...other
			} = this.props;

		const variantStyleModifier = (variant) ? `--${variant}` : '';

		const snapToInterval = (hscrollItemStyle) ? hscrollItemStyle.width : undefined;

		const itemsElements = items.map((item, i)=>{
			return (
				<View
					key={i}
					accessibilityRole='listitem'
					style={[styles[`list-item${variantStyleModifier}`], hscrollItemStyle]}
					>
					{ renderItem(item, i) }
				</View>
			);
		});

		if((Platform.OS == 'android' || Platform.OS == 'ios') && variant == 'hscroll')
			return(
				<ScrollView
					horizontal
					snapToInterval={snapToInterval}
					showsHorizontalScrollIndicator={false}
					style={[styles[`list${variantStyleModifier}`], style]}
					contentContainerStyle={[styles['list-container--hscroll'], hscrollContainerStyle]}
					>
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