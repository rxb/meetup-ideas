import PropTypes from 'prop-types';
import { View } from 'react-native';
import React from 'react';
import styles from '../styles/styles';

export const FLEX_ITEM_CLASS = 'flex-item';
export const FLEX_ITEM_SHRINK_CLASS = 'flex-item--shrink';
export const FLEX_ITEM_GROW_CLASS = 'flex-item--';
export const FLEX_GROW_FACTORS = [1,2,3,4,5,6,7];

class FlexItem extends React.Component {
	render() {
		const {
			children,
			className,
			shrink,
			growFactor,
			descendantStyles,
			isFirstChild,
			media,
			style,
			...other
		} = this.props;

		const styleKeys = [
			FLEX_ITEM_CLASS,
			shrink ? FLEX_ITEM_SHRINK_CLASS : undefined,
			growFactor ? `${FLEX_ITEM_GROW_CLASS}${growFactor}` : undefined,
			isFirstChild ? `${FLEX_ITEM_CLASS}--firstChild` : undefined,
		];

		const combinedStyles = [...descendantStyles, ...styleKeys.map((key, i)=>{
			return styles[key];
		})];

		return (
			<View
				style={[combinedStyles, style]}
				{...other}
			>
				{children}
			</View>
		);
	}
}

FlexItem.propTypes = {
	shrink: PropTypes.bool,
	growFactor: PropTypes.oneOf(FLEX_GROW_FACTORS),
};

export default FlexItem;
