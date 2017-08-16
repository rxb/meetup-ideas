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

const trailIcons = {
  black: require('../img/trailicons/black.png'),
  blue: require('../img/trailicons/blue.png'),
  blueBlack: require('../img/trailicons/blueBlack.png'),
  green: require('../img/trailicons/green.png'),
  greenBlue: require('../img/trailicons/greenBlue.png')
}

const TrailCard = (props) => {

	const {
		children,
		style,
		trail,
	} = props

	return(
		<Card style={{marginVertical: 6}}>
         <View style={{height: 70, alignItems: 'center', justifyContent: 'center'}}>
           <GoogleStaticMap
              style={{height: 70, position: 'absolute', borderTopLeftRadius: 5, borderTopRightRadius: 5,}}
              latitude={String(trail.latitude)}
              longitude={String(trail.longitude)}
              zoom={14}
              mapType='terrain'
              hasCenterMarker={false}
              size={{width: 180, height: 70 }}
              key={googleStaticMapApiKey}
            />
            <View style={{backgroundColor: 'red', width: 12, height: 12, borderRadius: 6}} />
          </View>
           <View style={{padding: 12}}>
              <Text style={[styles.text, styles.textSmall, styles.textStrong]} numberOfLines={1}>{trail.name}</Text>
              <Text style={[styles.text, styles.textSmall]} numberOfLines={1}>{trail.location}</Text>
              <Flex align="center">
                <FlexItem shrink >
                  <Image
                    source={trailIcons[trail.difficulty]}
                    style={{height: 12, width: 12, resizeMode: 'contain'}}
                    />
                </FlexItem>
                <FlexItem shrink style={{paddingLeft: 6}}>
                  <Text style={[styles.text, styles.textSmall, styles.textHint]}>{trail.length}mi</Text>
                </FlexItem>

              </Flex>
          </View>
        </Card>
	);
}


export default TrailCard;