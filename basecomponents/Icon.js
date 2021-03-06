import React from 'react';
import { View, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';

class Icon extends React.Component {
	render() {
		const {
			color,
			size,
			shape,
		} = this.props;

		// sketch can't do SVG yet, so we need a PNG for them
		// to be able to tint this, even on web we need to use svgs not as a standard image
		// would be nice to implement tintcolor from RN

		if(Platform.OS =='sketch')
			return(
				<Image
					source={{uri: `http://localhost:4000/${shape}?color=${color}`}}
					style={{width: 24, height: 24}}
					/>
			);

		if(Platform.OS =='web')
			return(
				<svg className="icon" style={{height: 24, width: 24, stroke: color, fill: 'none'}}>
					<use xlinkHref={`#icon-${shape}`} />
				</svg>
			);

		if(Platform.OS == 'ios' || Platform.OS == 'android')
			return(
				<Image
					source={{uri: `https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/png/512/android-alarm.png`}}
					style={{width: 24, height: 24, tintColor: color}}
					/>
			);
	}
}

Icon.defaultProps = {
	size: 'medium',
	color: 'orange'
};

Icon.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	shape: PropTypes.string,
	color: PropTypes.string
}

export default Icon;