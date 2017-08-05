import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../styles/styles';

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

import GoogleStaticMap from 'react-native-google-static-map';

const googleStaticMapApiKey = 'AIzaSyCnwc1liit6wAi50dJ7DfC9669VbDySW4M';


const VenueCard = (props) => {

	const {
		children,
		style,
		venue,
	} = props

	return(
		<Card style={{marginVertical: 6}}>
          {/*
          <Image
            source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
            style={{height: 100, resizeMode: 'cover'}}
           />
         */}
         <View style={{height: 70, alignItems: 'center', justifyContent: 'center'}}>
           <GoogleStaticMap
              style={{height: 70, position: 'absolute'}}
              latitude={String(venue.location.lat)}
              longitude={String(venue.location.lng)}
              zoom={14}
              mapType='terrain'
              hasCenterMarker={false}
              size={{width: 180, height: 70 }}
              key={googleStaticMapApiKey}
            />
            <View style={{backgroundColor: 'red', width: 12, height: 12, borderRadius: 6}} />
          </View>
           <View style={{padding: 12}}>

              <Text style={[styles.text, styles.textSmall, styles.textStrong]} numberOfLines={1}>{venue.name}</Text>
              <Text style={[styles.text, styles.textSmall]} numberOfLines={1}>{venue.location && venue.location.address}</Text>
              <Text style={[styles.text, styles.textSmall, styles.textHint]}>{venue.categories && venue.categories[0].name}</Text>
          </View>
        </Card>
	);
}


export default VenueCard;