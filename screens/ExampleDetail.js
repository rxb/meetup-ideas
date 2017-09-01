import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
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
		getFoursquareVenue(this.props.venueId)
			.then((json) => {
				if(json.response && json.response.venue){
					this.setState({venue: json.response.venue});
				}
			});
	}

	render() {

		const { navigate } = this.props.navigation;
		const { example, idea, exampleIndex } = this.props;

		// support more images later
		const exampleImages = [
			{uri: example.photo}
		];

		return (
		<View style={styles.container}>

			{/* MODAL HEADER */}
			<ModalHeader navigation={this.props.navigation} NavigationActions={NavigationActions} />

			<ScrollView style={styles.container}>
				<Stripe>


					{/* IMAGES LOADING STATE GRAY BACKGROUND */}
					{ exampleImages.length == 0 &&
						<View style={{height: 200, backgroundColor: '#ddd'}} />
					}


					{/* SIDE-SCROLLING, FOR MULTIPLE IMAGES */}
					{ exampleImages.length > 1 &&
					<List
							variant='hscroll'
							items={ exampleImages }
							style={{backgroundColor: '#ddd' }}
							hscrollItemStyle={[ {width: 250, borderLeftWidth: 1, borderLeftColor: 'white'}]}
							renderItem={(item, i)=>{
								return(
										<Image
											source={{uri: item.uri}}
											style={{height: 200, resizeMode: 'cover'}}
										 />
								);
							}}
							/>
					}


					{/* FULL WIDTH IMAGE, FOR SINGLE IMAGE */}
					{ exampleImages.length == 1 &&
							<Image
								source={{uri: exampleImages[0].uri}}
								style={{height: 200, resizeMode: 'cover'}}
							 />
					}


					{/* VENUE LOADED, SHOW STUFF */}
					{ example.title &&
					<Bounds>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textKicker]}>PAST MEETUP</Text>
								<Text style={[styles.text, styles.textPageHead]}>{example.title}</Text>
								<Text style={[styles.text, {marginTop: 6}]}>{example.attended} people attended</Text>

							</Chunk>
						</Section>
						{ example.description &&
							<Section>
								<Chunk>
									<Text style={[styles.text, styles.textSmall]}>{example.description}</Text>
								</Chunk>
							</Section>
						}
						<Section>
							<Flex align='center'>

								<FlexItem>
									<Chunk>
										<Text style={[styles.text, styles.textSectionHead]}>Hosted by</Text>
									</Chunk>
									<Chunk>
										<Text style={[styles.text]}>Sally Smeetup</Text>
										<Text style={[styles.text, styles.textSmall, styles.textSecondary]}>{example.groupName}</Text>
									</Chunk>
									<Chunk>
										<Link onPress={()=>{
											Linking.openURL(`mailto:richard@meetup.com?subject=Question about ${example.title}`);
											}}>
											<View style={{marginTop: 8, borderRadius: 5, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#eee', alignSelf: 'flex-start'}}>

												<Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Ask a question</Text>

											</View>
											{/*
											<DumbButton type="secondary" label="More on Foursquare" />
											*/}
										</Link>
									</Chunk>
								</FlexItem>
								<FlexItem shrink>
			 						<Image
			                            source={{uri: `https://randomuser.me/api/portraits/women/${exampleIndex}.jpg`}}
			                            style={{width: 100, height: 100, borderRadius: 50, resizeMode: 'cover'}}
			                            />
								</FlexItem>
							</Flex>
						</Section>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textSectionHead]}>Description</Text>
							</Chunk>
							<Chunk>
								<Text style={[styles.text]}>{idea.description}</Text>
							</Chunk>
						</Section>

					</Bounds>
					}

				</Stripe>
			</ScrollView>

			</View>

		);
	}
}


const mapStateToProps = (state, ownProps) => {
	const { params } = ownProps.navigation.state;
	const idea = state.groups[params.topic].ideas[params.ideaIndex];
	return ({
		topic: params.topic,
		ideaIndex: params.ideaIndex,
		exampleIndex: params.exampleIndex,
		idea: idea,
		example: idea.pastMeetups[params.exampleIndex],
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