import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import styles from '../styles/styles';

import { NavigationActions } from 'react-navigation'
import ModalHeader from '../components/ModalHeader';

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

class Locations extends React.Component {


	render() {

		const { navigate } = this.props.navigation;
		const {
			user,
			groups,
			locations
		} = this.props;


		if(!user.isFinding){
			return (

			<View style={styles.container}>

				<ModalHeader navigation={this.props.navigation} NavigationActions={NavigationActions} />

				<ScrollView style={styles.container}>

				<Stripe>
					<Section>
						<Chunk>
							<Text style={[styles.text, styles.textPageHead]}>Pick location</Text>
						</Chunk>

						{(Object.keys(locations)).map((key, i)=>{
							const location = locations[key];
							return(
								<Link
									key={i}
									onPress={()=>{
										this.props.setUserLocation(location.latitude, location.longitude, location.city);
										this.props.navigation.dispatch(NavigationActions.back());
									}}>
									<View style={{borderTopWidth: 1, borderTopColor: '#f4f4f4', paddingVertical: 14}}>
										<Text style={[styles.text]}>{location.city}</Text>
										{ key == 'device' &&
											<Text style={[styles.text, styles.textSmall, styles.textHint]}>Current location</Text>
										}
									</View>
								</Link>
							)
						})}

					</Section>

				</Stripe>

				</ScrollView>
			</View>
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
)(Locations);


