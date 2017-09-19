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


const SmallButton = (props) => {
	const {label} = props;
	return(
		<View style={{marginTop: 4, borderRadius: 5, paddingVertical: 16, paddingHorizontal: 16, backgroundColor: '#eee',}}>

			<Text style={[styles.text, styles.textSmall, styles.textSecondary, styles.textStrong, {textAlign: 'center'}]}>{label}</Text>
		</View>
	)
}


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

		const venueImages = [];

		// flatten foursquare images
		if(this.state.venue.photos && this.state.venue.photos.groups.length > 0){
			venueImages.push(...this.state.venue.photos.groups[0].items)
		};


		// location-related parsing
		let mapLinking;
		if(this.state.venue && this.state.venue.location){

			// get static map image
			// append to image array
			const mapUri = `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.venue.location.lat},${this.state.venue.location.lng}&markers=color:red|${this.state.venue.location.lat},${this.state.venue.location.lng}&zoom=13&size=250x180&maptype=terrain&scale=2&key=AIzaSyAibsbqDXjn8sl5f3h4G2GvmxheyGAbX3M`;
			venueImages.push( {type: 'map', uri: mapUri});

			// generate map intent for tapping on address and bouncing out to maps
			mapLinking = (Platform.OS == 'android') ? `geo:${this.state.venue.location.lat},${this.state.venue.location.lng}` : `http://maps.apple.com/?sll=${this.state.venue.location.lat},${this.state.venue.location.lng}&q=${this.state.venue.name}`;
		}

		// flatten foursquare tips
		let tips = [];
		if(this.state.venue && this.state.venue.tips){
			tips = this.state.venue.tips.groups.reduce((a,b)=>{
				return [...a, ...b.items];
			}, [])
			.sort((a,b)=>{
				return a.likes.count > b.likes.count;
			}).slice(0,6);
		}

		let contactButtons = [];
		let contactable = false;
		if (this.state.venue.contact && this.state.venue.contact.phone){
			contactable = true;
			contactButtons.push(<FlexItem key={1}>
									<Link onPress={()=>{
										Linking.openURL(`tel:${this.state.venue.contact.phone}`);
										}}>
										<SmallButton label="Call venue" />
									</Link>
								</FlexItem>);
		}
		if (this.state.venue.url){
			contactable = true;
			contactButtons.push(<FlexItem key={2}>
									<Link onPress={()=>{
										Linking.openURL(this.state.venue.url);
										}}>
										<SmallButton label="Visit website" />
									</Link>
								</FlexItem>);
		}
		if (!contactable){
			contactButtons.push(<FlexItem key={3}>
								<Link onPress={()=>{
									Linking.openURL(`http://google.com/search?q=${this.state.venue.name}+${this.state.venue.location.address}+${this.state.venue.location.city}`);
									}}>
									<SmallButton label={(contactable) ? 'Search Google' :'Search Google for contact info'} />
								</Link>
							</FlexItem>);
		}


		return (
		<View style={styles.container}>

			{/* MODAL HEADER */}
			<ModalHeader
				navigation={this.props.navigation}
				NavigationActions={NavigationActions}
				rightComponent={(
					<Link
						onPress={()=>{
							// fdfsd
						}}
						>
						<Text style={[styles.text, styles.textHint, styles.textSmall, {fontSize: 12}]}>
							venue data by <Text>Foursquare</Text>
						</Text>
					</Link>
				)}
				/>

			<ScrollView style={styles.container}>
				<Stripe>


					{/* IMAGES LOADING STATE GRAY BACKGROUND */}
					{ venueImages.length == 0 &&
						<View style={{height: 180, backgroundColor: '#ddd'}} />
					}


					{/* SIDE-SCROLLING, FOR MULTIPLE IMAGES */}
					{ venueImages.length > 1 &&
					<List
							variant='hscroll'
							items={ venueImages }
							style={{backgroundColor: '#ddd' }}
							hscrollItemStyle={[ {width: 250, borderLeftWidth: 1, borderLeftColor: 'white'}]}
							renderItem={(item, i)=>{
								const uri = (item.type == 'map') ? item.uri : `${item.prefix}300x500${item.suffix}`;
								return(
										<Image
											source={{uri: uri}}
											style={{height: 180, resizeMode: 'cover'}}
										 />
								);
							}}
							/>
					}


					{/* FULL WIDTH IMAGE, FOR SINGLE IMAGE */}
					{ venueImages.length == 1 &&
							<Image
								source={{uri: venueImages[0].uri}}
								style={{height: 180, resizeMode: 'cover'}}
							 />
					}


					{/* VENUE LOADED, SHOW STUFF */}
					{ this.state.venue.name &&
					<Bounds>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textKicker]}>VENUE IDEA</Text>
								<Text style={[styles.text, styles.textPageHead]}>{this.state.venue.name}</Text>
								<Text style={[styles.text, styles.textSmall, styles.textSecondary, {marginTop: 7}]}>{
									/* concat venue category labels */
									this.state.venue.categories && this.state.venue.categories.map((cat, i)=>{
										return(
											<Text key={i}>{cat.shortName}{(i<(this.state.venue.categories.length-1))? ', ' : ' '}</Text>
										);
									})
								}</Text>
							</Chunk>
						</Section>
						{ (this.state.venue.description || this.state.venue.attributes.groups.length > 0 ) &&
							<Section>

								{ this.state.venue.description &&
									<Chunk>
										<Text style={[styles.text]}>{this.state.venue.description}</Text>
									</Chunk>
								}

								{ this.state.venue.attributes.groups.length > 0 &&
									<Chunk>
										<Text style={[styles.text, styles.textSecondary, styles.textSmall]}>Good to know:
										{ this.state.venue.attributes.groups.map((g, i) => {
											return(
												<Text style={[styles.text, styles.textSecondary, styles.textSmall]} key={i}> {g.summary}{(i<(this.state.venue.attributes.groups.length-1))? ',' : ''}</Text>
												);
										})}
										</Text>
									</Chunk>
								}
							</Section>
						}

						<Section>

							{/* ADDRESS */}
							{ this.state.venue.location &&
							<Flex>
								<FlexItem growFactor={2}>
									<Chunk>
										<Text style={[styles.text, styles.textSecondary]}>Address</Text>
									</Chunk>
								</FlexItem>
								<FlexItem growFactor={6}>
										<Link onPress={()=>{
											// link address to geo: intent
											Linking.openURL(mapLinking);
											}}>
											<Chunk>
												<Text style={[styles.text]}>{this.state.venue.location.address}</Text>
												<Text style={[styles.text]}>{this.state.venue.location.city}, {this.state.venue.location.state}</Text>
											</Chunk>
										</Link>
								</FlexItem>

							</Flex>
							}


							{/* HOURS */}
							{ this.state.venue.hours &&
							<Flex>
								<FlexItem growFactor={2}>
									<Chunk>
										<Text style={[styles.text, styles.textSecondary]}>Hours</Text>
									</Chunk>
								</FlexItem>
								<FlexItem growFactor={6}>
									<Chunk>
										{(this.state.venue.hours.timeframes).map((timeframe, i)=>{
											return(
												<Flex key={i}>
													<FlexItem growFactor={1}>
														<Text style={[styles.text]}>{timeframe.days}</Text>
													</FlexItem>
													<FlexItem growFactor={2}>
														<Chunk>
														{ timeframe.open.map((o, i)=>{
															return(
																	<Text key={i} style={[styles.text, styles.textSecondary]}>{o.renderedTime}</Text>
															)
														})}
														</Chunk>

													</FlexItem>
												</Flex>
											);
										})}
									</Chunk>
								</FlexItem>
							</Flex>
							}


							{/* WEBSITE */}
							{this.state.venue.url &&
								<Flex>
									<FlexItem growFactor={2} >
										<Chunk>
											<Text style={[styles.text, styles.textSecondary]}>Website</Text>
										</Chunk>
									</FlexItem>
									<FlexItem growFactor={6} >
										<Link onPress={()=>{
											Linking.openURL(this.state.venue.url);
											}}>
										<Chunk>
											<Text style={[styles.text]} numberOfLines={1}>{this.state.venue.url.split('/').slice(2,this.state.venue.url.split('/').length).join('/')}</Text>
										</Chunk>
										</Link>
									</FlexItem>

								</Flex>
							}

							{/* PHONE NUMBER */}
							{this.state.venue.contact && this.state.venue.contact.phone &&
								<Flex>
									<FlexItem growFactor={2}>
										<Chunk>
											<Text style={[styles.text, styles.textSecondary]}>Phone</Text>
										</Chunk>
									</FlexItem>
									<FlexItem growFactor={6}>
										<Chunk>
											<Link onPress={()=>{
												// phone call intent
												Linking.openURL(`tel:${this.state.venue.contact.phone}`);
												}}>
											<Text style={[styles.text]}>{this.state.venue.contact.formattedPhone}</Text>

												{/*
												<View style={{marginTop: 8, borderRadius: 5, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#eee', alignSelf: 'flex-start'}}>

												<Flex align='center'>
												<FlexItem shrink>
													<Image
														source={require('../img/icons/Phone.png')}
														style={[{width: 14, height: 14, tintColor: 'rgba(0,0,0,.55)', resizeMode: 'contain'}]}
														/>
													</FlexItem>
													<FlexItem style={{paddingLeft: 8}} shrink>
														<Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Call venue</Text>
													</FlexItem>
													</Flex>

												</View>
												*/}
											</Link>
											</Chunk>
									</FlexItem>
								</Flex>
							}

							{/* WHEN NO WEBSITE OR PHONE

							{!this.state.venue.url && !(this.state.venue.contact && this.state.venue.contact.phone) &&

								<Flex>
									<FlexItem growFactor={2}>
										<Chunk>
											<Text style={[styles.text, styles.textSecondary]}></Text>
										</Chunk>
									</FlexItem>
									<FlexItem growFactor={6}>
										<Chunk>
										 <Link onPress={()=>{
												// phone call intent
												Linking.openURL(`http://google.com/search?q=${this.state.venue.name}+${this.state.venue.location.address}+${this.state.venue.location.city}`);
												}}>
												<View style={{marginTop: 8, borderRadius: 5, paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#eee', alignSelf: 'flex-start'}}>

													<Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Search web for contact info</Text>

												</View>
											</Link>
											</Chunk>
									</FlexItem>
								</Flex>
							}

							*/}

							<Chunk style={{marginTop: 6}}>
								<Flex>
									{contactButtons}
								</Flex>
							</Chunk>
							<Chunk>
								<Text style={[styles.text, styles.textSmall, styles.textSecondary, {textAlign: 'center'}]}>Contact the venue to get more information or confirm availability</Text>
							</Chunk>
						</Section>

						{/* FOURSQUARE TIPS */}
						{ tips && tips.length > 0 &&
						<Section>

							{tips.map((tip, i)=>{
								if(! (tip.user && tip.user.photo))
									return false;
								const uri =`${tip.user.photo.prefix}80x80${tip.user.photo.suffix}`;
								return(
										<Chunk style={{paddingTop: 8}} key={i}>
											<Flex>
												<FlexItem shrink>
													<Image
														source={{uri: uri}}
														style={{width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'}}
														/>
												</FlexItem>
												<FlexItem>
													<Text style={[styles.text]}>&ldquo;{tip.text}&rdquo;</Text>
													<Text style={[styles.text, styles.textSmall, styles.textSecondary]}>{tip.user.firstName}</Text>
												</FlexItem>
											</Flex>
										</Chunk>
								);
							})}

							{/*
							<Chunk>
								<Link onPress={()=>{
									// bounce to foursquare app/site
									Linking.openURL(this.state.venue.canonicalUrl);
									}}>
									<DumbButton type="secondary" label="More on Foursquare" />
								</Link>
							</Chunk>
							*/}

						 </Section>
						}


						{/* SPACER FOR BOTTOM BUTTON */}
						<View style={{height: 80}}/>
					</Bounds>
					}

				</Stripe>
			</ScrollView>


			{/* floating bottom button */}
			<View style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 6}}>
					<Link
						onPress={()=>{
							// select venue for schedule form
							this.props.setScheduleWhere(this.state.venue);

							// close modal
							// navigate to schedule form
							this.props.navigation.dispatch(NavigationActions.back());
							if(this.props.notFromSchedule){
								setTimeout(() => {
									navigate('Schedule', {ideaIndex: this.props.ideaIndex, topic: this.props.topic})
								}, 600);
							}
						}}>
						<DumbButton label="Pick this venue" style={[styles.shadow]} elevation={3} />
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
		venueId: params.venueId,
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