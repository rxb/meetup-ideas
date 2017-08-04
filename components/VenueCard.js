import React from 'react';
import { View, Image, Text } from 'react-primitives';
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

const VenueCard = (props) => {

	const {
		children,
		style,
		venue,
	} = props

	return(
		<Card style={{marginVertical: 6}}>
          <Image
            source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
            style={{height: 100, resizeMode: 'cover'}}
           />
           <View style={{padding: 12}}>
              <Text style={[styles.text, styles.textSmall, styles.textStrong]}>{venue}</Text>
              <Text style={[styles.text, styles.textSmall]}>123 Main St</Text>
              <Text style={[styles.text, styles.textSmall, styles.textHint]}>$$ • Coffee Shop</Text>
          </View>
        </Card>
	);
}


export default VenueCard;