import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';

import { Location, Permissions } from 'expo';

import { setUserLocation, setDeviceLocation, setIsFinding } from '../actions';
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

async function getLocationAsync() {

	const { status } = await Permissions.askAsync(Permissions.LOCATION);
	if (status === 'granted') {
		return Location.getCurrentPositionAsync({enableHighAccuracy: true});
	} else {
		throw new Error('Location permission not granted');
	}
}

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
							return(
								<Chunk key={i}>
									<Link
										disabled={disabled}
										onPress={()=>{
											navigate('GroupHome', {topic: topic});
										}}>
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
    locations: state.locations
  });
}

export default connect(
  mapStateToProps,
  { setUserLocation, setDeviceLocation, setIsFinding }
)(Choose);


