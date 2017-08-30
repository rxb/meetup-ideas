import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import styles from '../styles/styles';

import { Location, Permissions, Notifications, Facebook } from 'expo';

import { setUserLocation, setDeviceLocation, setIsFinding, setUserName } from '../actions';
import { connect } from 'react-redux';

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




// FACEBOOK LOG IN
async function logIn() {
	const {
	  type,
	  token
	} = await Expo.Facebook.logInWithReadPermissionsAsync("123539831626913", {
	  permissions: ["public_profile", "email"]
	});
	if (type === "success") {
	  // Get the user's name using Facebook's Graph API
	  const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
	  return await response;
	}
}



// LOCATION
async function getLocationAsync() {

	const { status } = await Permissions.askAsync(Permissions.LOCATION);
	if (status === 'granted') {
		return Location.getCurrentPositionAsync({enableHighAccuracy: true});
	} else {
		throw new Error('Location permission not granted');
	}
}


// SCREEN
class Choose extends React.Component {

	componentDidMount() {

		this.props.setIsFinding(true);

		// locate device
		getLocationAsync().then((position)=>{
			// reverse geocode
			Location.reverseGeocodeAsync(position.coords).then((locations)=>{
				// only set if we can get a complete match
				if(locations && locations.length && locations[0].city){
					// set city, lat/lon
					const city = locations[0].city;
					this.props.setDeviceLocation(position.coords.latitude, position.coords.longitude, city);
					this.props.setUserLocation(position.coords.latitude, position.coords.longitude, city);
				}
				this.props.setIsFinding(false);
			});
		});
	}

	render() {

		const { navigate } = this.props.navigation;

		const {
			user,
			groups,
			locations
		} = this.props;

		if(user.isFinding){
			return(
				<View style={[styles.absoluteFill, styles.absoluteCenter]}>
					<View>
						<Chunk>
							<ActivityIndicator size="large" />
						</Chunk>
						<Chunk>
							<Text>Finding location...</Text>
						</Chunk>
					</View>
				</View>
			);
		}

		if(!user.isFinding){
			return (
				<Stripe style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
					<Section>
						<Chunk>
							<Text style={[styles.text, styles.textSectionHead, {textAlign: 'center'}]}>Prototype!</Text>
						</Chunk>
						<Chunk>
							<Text style={[styles.text, styles.textSecondary, {textAlign: 'center'}]}>Imagine you've just started a Meetup Group about...</Text>
						</Chunk>
					</Section>
					<Section>
						{(Object.keys(groups)).map((topic, i)=>{
							const group = groups[topic];
							const disabled = group.notFinished;
							const navigateIdea = ()=>{
								navigate('GroupHome', {topic: topic});
							}
							return(
								<Chunk key={i}>
									<Link
										onPress={(!disabled) ? navigateIdea : null}
										onLongPress={navigateIdea}
										delayLongPress={2000}
										>
										<DumbButton
											type='secondary'
											label={group.label+((disabled)?' (coming soon)' : '')}
											style={{opacity: (disabled) ? .35 : 1}}
											/>
									</Link>
								</Chunk>
							);
						})}
					</Section>

					<Section style={[{borderBottomWidth: 0}]}>
						<Link
							onPress={()=>{
								navigate('Locations');
							}}
							>
							<Chunk>
								<Text style={[styles.text, styles.textSecondary, {textAlign: 'center'}]}> Location: <Text style={styles.textLink}>{user.city}</Text></Text>
							</Chunk>
						</Link>

						{/* facebook log in test
						<Link
							onPress={()=>{
								logIn()
									.then( (response) => response.json() )
									.then( (json) => {
										this.props.setUserName(json.name);
									});
							}}
							>
							<Chunk>
								<Text style={[styles.text, styles.textSecondary, {textAlign: 'center'}]}>
									{ (user.name) ? `Hey ${user.name}` : 'Test Facebook Login' }
								</Text>
							</Chunk>
						</Link>
						*/}

					</Section>

				</Stripe>
			);
		}
  }
}

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.navigation.state;
  return ({
  	groups: state.groups,
    user: state.user,
    locations: state.locations,
  });
}

export default connect(
  mapStateToProps,
  { setUserLocation, setDeviceLocation, setIsFinding, setUserName }
)(Choose);


