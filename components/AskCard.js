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



const AskCard = (props) => {

	const {
		children,
		style,
		venue,
	} = props

	return(
    <Card style={{height: 148, marginVertical: 6, justifyContent: 'center'}}>
      <View style={{padding: 12}}>
        <Image
          source={require('../img/icons/Chat-Bubble.png')}
          style={[styles.iconInput, {alignSelf: 'center', marginBottom: 12, width: 32, height: 32}]}
          />
        <Text style={[styles.text, styles.textSmall, styles.textStrong, {textAlign: 'center'}]}>Ask your members</Text>
        <Text style={[styles.text, styles.textSmall, styles.textHint, {textAlign: 'center'}]}>They might know of something great</Text>
      </View>
    </Card>
	);
}


export default AskCard;