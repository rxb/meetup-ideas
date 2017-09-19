import React from 'react';
import { ScrollView, Linking, Alert } from 'react-native';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import styles from '../styles/styles';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';

import {
	resetSchedule,
	setScheduleWhen,
} from '../actions';

import moment from 'moment';
import {data, getFoursquareVenue} from '../data';
import ModalHeader from '../components/ModalHeader';
import {DayView, CalendarEvent} from 'react-native-day-planner';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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


class CalendarPicker extends React.Component {

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

		return (
			<View style={styles.container}>

				<ModalHeader navigation={this.props.navigation} NavigationActions={NavigationActions} />

				<CalendarList
					scrollEnabled={true}
					style={styles.calendar}
					onDayPress={(day) => {
						Alert.alert(`day ${day.dateString}`)
					}}
					/>

				{/*
				<ScrollView style={styles.container}>
					<Stripe>
						<Bounds>

							<DayView
							  events={[
							  	{ title: 'mom stuff', startDate: moment().startOf('day').toDate(), endDate: moment().startOf('day').add(2, 'h').toDate() },
							  	{ title: 'dad stuff', startDate: moment().startOf('day').add(1, 'h').toDate(), endDate: moment().startOf('day').add(4, 'h').toDate() }
							  ]}
							  hourHeight={50}
							  dayStartDate={moment().startOf('day').toDate()}
							  currentTime={moment().toDate()}
							  >
							    {(event, styles) => <CalendarEvent style={[styles, {backgroundColor: 'rgba(0,0,0,.25)',borderColor: 'rgba(255,255,255,.75)', borderWidth: 1, padding: 12}]} title={event.title} />}
							</DayView>

						</Bounds>
					</Stripe>
				</ScrollView>
				*/}
			</View>
		);
	}
}


const mapStateToProps = (state, ownProps) => {
	const { params } = ownProps.navigation.state;
	return ({});
}

const actionCreators = {
	resetSchedule,
	setScheduleWhen,
}

export default connect(
	mapStateToProps,
	actionCreators
)(CalendarPicker);