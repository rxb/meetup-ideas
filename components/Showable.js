import React from 'react';
import { Animated, Easing, View } from 'react-native';
import styles from '../styles/styles';

const offsetY = 50;

class Showable extends React.Component {

	static defaultProps = {
    	onShow: () => {},
    	onHide: () => {}
  	}

	constructor(props) {
		super(props);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.translateY = new Animated.Value(offsetY)
		this.opacity = new Animated.Value(0)
	}

	show(){
		this.translateY.setValue(offsetY);
		Animated.parallel([
			Animated.timing(
		  	this.translateY,
			{
				toValue: 0,
				duration: 250,
				easing: Easing.inOut(Easing.quad),
				useNativeDriver: true
			}
		),
		Animated.timing(
		  	this.opacity,
			{
				toValue: 1,
				duration: 250,
				easing: Easing.inOut(Easing.quad),
				useNativeDriver: true
			}
		  ),
		]).start();
	}

	hide(){
		Animated.parallel([
			Animated.timing(
		  	this.translateY,
		  	{
		      toValue: offsetY * -1,
		      duration: 250,
		      easing: Easing.inOut(Easing.quad),
		      useNativeDriver: true
		    }
		  ),
		Animated.timing(
		  	this.opacity,
		  	{
		      toValue: 0,
		      duration: 250,
		      easing: Easing.inOut(Easing.quad),
		      useNativeDriver: true
		    }
		  ),
		]).start();
	}

	componentWillReceiveProps(nextProps) {
       if (nextProps.visible) {
       		this.show(this.onShow);
       }
       else{
       		this.hide(this.onHide);
       }
    }


	render(){
		const {
			children,
			style,
			onShow,
			onHide,
			...other
		} = this.props;

		return(
			<Animated.View style={[{
				opacity: this.opacity,
				transform: [
					{translateY: this.translateY}
				]
			}, style]}>
				{children}
			</Animated.View>
		);
	}
}


export default Showable;