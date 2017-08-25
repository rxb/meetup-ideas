import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
import styles from '../styles/styles';

import VenueCard from '../components/VenueCard';
import DatePicker from 'react-native-datepicker'

import { connect } from 'react-redux';
import {
	resetSchedule,
	setScheduleWhere,
	setScheduleWhen,
	setScheduleDuration
} from '../actions';
import {
	data,
	getFoursquareVenues,
	getSuggestedMoment,
	getForecastsForLatLon,
	findTimeStampInForecasts

} from '../data';


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

const iconOffset = (20 + 16);
const hscrollContainerStyle = {paddingLeft: 24 + iconOffset};
const hintStyle = {paddingLeft: iconOffset}

const Option = (props) => {
	return(
		<Card style={{padding: 12}}>
			{props.children}
		</Card>
	);
}


class AutoExpandingTextInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: props.defaultValue, height: 0};
		this._checkHeight = this._checkHeight.bind(this);
		this.appendText = this.appendText.bind(this);
	}

	_checkHeight(event) {
		this.setState({
			height: event.nativeEvent.contentSize.height + 8,
		});
	}

	appendText(text = '') {
		this.setState({
			text: this.state.text + "\n• "
		});
	}

	render() {
		const {
			style,
			...other
		} = this.props;
		return (
			<TextInput
				{...other}
				multiline={true}
				onChangeText={(text) => this.setState({text: text})}
				onContentSizeChange={this._checkHeight}
				style={[style, {height: Math.max(35, this.state.height)}]}
				value={this.state.text}
			/>
		);
	}
}

class Schedule extends React.Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Schedule',
		headerRight: (
			<Link onPress={()=>{navigation.navigate('End')}}>
				<Text style={[styles.text, styles.textStrong, {color: '#0076FF', paddingHorizontal: 16}]}>{(Platform.OS == 'android') ? 'POST' : 'Post'}</Text>
			</Link>
		)
	});

	constructor(props){
		super(props);
		this.state = {
			venues: [],
		}
	}

	componentDidMount(){

		getFoursquareVenues(this.props.idea.where.categoryId, this.props.idea.where.radiusMeters, this.props.user.latitude, this.props.user.longitude)
			.then((venues) => {
					this.setState({venues: venues});
			});



		getForecastsForLatLon(this.props.user.latitude, this.props.user.longitude)
			.then((forecasts) => {
				//const timestamp = moment().startOf('hour').add(1, 'w').unix();
				//const forecast = findTimeStampInForecasts(timestamp, forecasts);
				this.setState({forecasts: forecasts});
			});
	}



	render() {

		const { navigate } = this.props.navigation;

		// turn agenda into plain text
		const idea = this.props.idea;
		const agendaString = idea.agenda.map((step, i)=>{
			let stepString = `${'\n'}- ${step.label}`;
			if(step.minutes){
				stepString += ` (${step.minutes} min)`;
			}
			return stepString;
		}).join('');
		const defaultDescription = `What we'll do: ${'\n'}${agendaString}`

		// generate suggested dates
		const generateWhenOptions = (options, weeksOut) =>{
			return options.map((item, i)=>{
				return getSuggestedMoment(item.day, item.hour, weeksOut);
			}).sort((a,b) => {
				return a.unix() - b.unix()
			});
		}
		const whenOptions = [
			...generateWhenOptions(idea.when.options, 1),
			...generateWhenOptions(idea.when.options, 2)
		];

		const dateTimeFormat = 'dddd, MMM D LT';

		return (

			<KeyboardAwareScrollView
				style={styles.stripeCollection}
				>
				<Stripe style={styles.stripeCollection}>
					<Bounds>

						<Section style={styles.sectionTable}>
							<Chunk>
								<TextInput defaultValue={idea.title} placeholder="Event title" style={[styles.input, styles.inputBig]} underlineColorAndroid="transparent"  />
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Calendar.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>

										{/*
										<TextInput
											placeholder="When?"
											style={[styles.input]}
											value={this.props.schedule.when}
											underlineColorAndroid="transparent"
											/>
										*/}

										<DatePicker
											style={{padding: 0, margin: 0, width: 'auto'}}
											customStyles={{
												dateInput: [styles.input, {height: 'auto', justifyContent: 'flex-start', alignItems: 'flex-start'} ],
												dateTouchBody: {height: 'auto'},
												placeholderText: {fontSize: 16},
												dateText: {fontSize: 16},
											}}
											date={ (this.props.schedule.when) ? moment(this.props.schedule.when).format(dateTimeFormat) : ''}
											mode="datetime"
											format={dateTimeFormat}
											placeholder="When?"
											confirmBtnText="Confirm"
											cancelBtnText="Cancel"
											showIcon={false}
											is24Hour={false}
											onDateChange={(datetime) => {
												this.props.setScheduleWhen( moment(datetime).format(dateTimeFormat) )
											}}
											/>

									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTableFooter}>
							<List
								variant='hscroll'
								items={whenOptions}
								hscrollItemStyle={{width: 140, paddingRight: 8}}
								hscrollContainerStyle={hscrollContainerStyle}
								renderItem={(dateOption, i)=>{
									const dateOptionString = moment(dateOption).format('dddd, MMM D [at] LT');
									let forecast;
									if(this.state.forecasts){
										forecast = findTimeStampInForecasts(dateOption.unix(), this.state.forecasts);
									}
									return(
										<Link key={i} onPress={()=>{
											this.props.setScheduleWhen( moment(dateOption).format(dateTimeFormat) )
										}}>
											<Option>
												<Text style={[styles.text, styles.textSmall]}>{dateOptionString}</Text>
												{ forecast &&
													<Flex noGutters={true}>
														<FlexItem shrink style={{paddingTop: 8}}>
															<Image
																source={{uri: `https://icons.wxug.com/i/c/i/${forecast.icon}.gif`}}
																style={{width: 16, height: 16, resizeMode: 'contain'}}
																/>
														</FlexItem>
														<FlexItem style={{paddingLeft: 4, paddingTop: 8}}>
															<Text style={[styles.text, styles.textSecondary, {fontSize: 11, lineHeight: 16}]}>{forecast.temp.english}° {/* {forecast.condition} */}</Text>
													</FlexItem>
													</Flex>
												}
												{ !forecast &&
													<View style={{height: 24}} />
												}
											</Option>
										</Link>
									);
								}}
								/>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Most <Text style={styles.textStrong}>{idea.title}</Text> Meetups happen {idea.when.description}</Text>
							</Chunk>

							{/*
							<Chunk>
								<Link onPress={()=>{
									navigate('CalendarPicker');
								}}>
									<Text>Calendar picker</Text>
								</Link>
							</Chunk>
							*/}

						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Time.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<TextInput
											placeholder="How long will it be?"
											style={[styles.input]}
											underlineColorAndroid="transparent"
											value={this.props.schedule.duration}
											/>
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTableFooter}>
							<List
								variant='hscroll'
								items={idea.duration.options}
								hscrollItemStyle={{width: 100, paddingRight: 8}}
								hscrollContainerStyle={hscrollContainerStyle}
								renderItem={(item, i)=>{
									return(
										<Link key={i} onPress={()=>{
											this.props.setScheduleDuration(item)
										}}>
											<Option>
												<Text style={[styles.text, styles.textSmall]}>{item}</Text>
											</Option>
										</Link>
									);
								}}
								/>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Most <Text style={[styles.textStrong]}>{idea.title}</Text> Meetups last {idea.duration.description}</Text>
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Pin.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<View>
											{ this.props.schedule.where &&
												<View>
													<Text style={[styles.text]}>{this.props.schedule.where.name}</Text>
													{this.props.schedule.where.location &&
														<Text style={[styles.text, styles.textSecondary, styles.textSmall]}>{this.props.schedule.where.location.address} • {this.props.schedule.where.location.city}</Text>
													}
												</View>
											}
											{ !this.props.schedule.where &&
												<Text style={[styles.text, styles.textHint]}>Where?</Text>
											}
										</View>
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTableFooter}>
							<List
								variant='hscroll'
								items={this.state.venues}
								hscrollItemStyle={{width: 180+8, paddingRight: 8}}
								hscrollContainerStyle={hscrollContainerStyle}
								renderItem={(item, i)=>{
									return(
										<Link
											key={i}
											onPress={()=>{
												navigate('VenueDetail', {venueId: item.id, ideaIndex: this.props.ideaIndex});
											}}>
											<VenueCard venue={item} />
										</Link>
									);
								}}
								/>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Most <Text style={styles.textStrong}>{idea.title}</Text> Meetups happen at {idea.where.description}</Text>
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Document.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<AutoExpandingTextInput
											placeholder="Agenda"
											underlineColorAndroid="transparent"
											style={[styles.input]}
											defaultValue={defaultDescription}
											ref={instance => { this.agendaInput = instance; }}
											/>
									</Chunk>
									{/*
									<Link
											onPress={()=>{
												this.agendaInput.appendText('\n•');
											}}>
											<View style={{backgroundColor: '#f9f9f9', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, alignSelf: 'flex-start', marginVertical: 8}}>
												<Text style={[styles.text, styles.textHint, styles.textSmall]}>add bulletpoint</Text>
											</View>
										</Link>
										*/}
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Chat-Bubble.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<AutoExpandingTextInput
											placeholder="Message from the host"
											underlineColorAndroid="transparent"
											style={[styles.input]}
											/>
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Share what you’ll do, what members should bring, and other important details they should know.</Text>
							</Chunk>
						</Section>


					</Bounds>
				</Stripe>
			</KeyboardAwareScrollView>

		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { params } = ownProps.navigation.state;
	return ({
		ideaIndex: params.ideaIndex,
		topic: params.topic,
		idea: state.groups[params.topic].ideas[params.ideaIndex],
		schedule: state.schedule,
		user: state.user
	});
}

const actionCreators = {
	resetSchedule,
	setScheduleWhere,
	setScheduleWhen,
	setScheduleDuration
}

export default connect(
	mapStateToProps,
	actionCreators
)(Schedule);

