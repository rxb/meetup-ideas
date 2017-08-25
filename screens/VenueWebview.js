import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { View, Text, Image, StyleSheet, Platform, WebView } from 'react-native';
import ModalHeader from '../components/ModalHeader';

import styles from '../styles/styles';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import {
	resetSchedule,
	setScheduleWhere,
} from '../actions';

import {data, getFoursquareVenue} from '../data';


import {
	DumbButton,
	Stripe,
	Bounds,
	Section,
	Chunk,
	Flex,
	FlexItem,
	Avatar,
	Icon,
	List,
	Card,
	Chip,
	Inline,
	Tabs,
	Link,
	Modal,
	Toast,
} from '../basecomponents';


class VenueDetail extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			venue: {}
		}
	}


 	componentDidMount(){

	}

	render() {

		const { navigate } = this.props.navigation;
		const { url } = this.props;

		return (
		<View style={styles.container}>

			{/* MODAL HEADER */}
			<ModalHeader navigation={this.props.navigation} NavigationActions={NavigationActions} />

			<WebView
				source={{uri: url}}
				/>

			{/* floating bottom button */}
			<View style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 6}}>
				<Link
					onPress={()=>{
						// select venue for schedule form
						// this.props.setScheduleWhere(this.state.venue);

						// close modal
						// navigate to schedule form
						this.props.navigation.dispatch(NavigationActions.back());
						if(this.props.notFromSchedule){
							setTimeout(() => {
								navigate('Schedule', {ideaIndex: this.props.ideaIndex, topic: this.props.topic})
							}, 600);
						}
					}}>
					<DumbButton label="Pick this trail for the Meetup" style={[styles.shadow]} elevation={3} />
				</Link>
			</View>

		</View>

		);
	}
}


const mapStateToProps = (state, ownProps) => {
	const { params } = ownProps.navigation.state;
	return ({
		ideaIndex: params.ideaIndex,
		topic: params.topic,
		url: params.url,
		notFromSchedule: params.notFromSchedule
	});
}

const actionCreators = {
	resetSchedule,
	setScheduleWhere,
}

export default connect(
	mapStateToProps,
	actionCreators
)(VenueDetail);