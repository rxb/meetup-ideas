import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/styles';

import { Location, Permissions } from 'expo';

import { setUserLocation, setUserCity, setIsFinding } from '../actions';
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
					// set city
					const city = locations[0].city;
					this.props.setUserCity(city);

					// set lat/lon
					this.props.setUserLocation(position.coords.latitude, position.coords.longitude);
				}
				this.props.setIsFinding(false);
			});
		});
	}

	render() {

		const { navigate } = this.props.navigation;
		const {
			user,
			groups
		} = this.props;

		return (
			<Stripe style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
				<Section>
					<Chunk>
						<Text style={[styles.text, styles.textSectionHead, {textAlign: 'center'}]}>Prototype!</Text>
					</Chunk>
					<Chunk>
						<Text style={[styles.text, styles.textSecondary, {textAlign: 'center'}]}>Imagine you've just started a Parenting Meetup Group...</Text>
					</Chunk>
				</Section>
				<Section>
					{(Object.keys(groups)).map((topic, i)=>{
						return(
							<Chunk key={i}>
								<Link
									onPress={()=>{
										navigate('GroupHome', {topic: topic});
									}}>
									<DumbButton type='secondary' label={'Start'} />
								</Link>
							</Chunk>
						);
					})}
				</Section>
				<Section style={[{borderBottomWidth: 0}]}>

					<Chunk>
						{!user.isFinding &&
							<Text style={[styles.text, styles.textSmall, styles.textHint, {textAlign: 'center'}]}>Current location: {user.city}</Text>
						}
						{ user.isFinding &&
							<Text style={[styles.text, styles.textSmall, styles.textHint, {textAlign: 'center'}]}>Finding current location...</Text>
						}
					</Chunk>
				</Section>
			</Stripe>
		);
  }
}

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.navigation.state;
  return ({
  	groups: state.groups,
    user: state.user
  });
}

export default connect(
  mapStateToProps,
  { setUserLocation, setUserCity, setIsFinding }
)(Choose);


