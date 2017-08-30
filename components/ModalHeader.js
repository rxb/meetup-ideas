import React from 'react';
import { View, Image, Text, Platform } from 'react-native';
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

export default (props) => {
	return(
		<View elevation={4} style={[{ alignItems: 'flex-start'},
			(Platform.OS == "ios" ?
				{height: 44, marginTop:  20, backgroundColor: '#EFEFF2'} :
				{height: 56, paddingTop:  6, backgroundColor: '#FFFFFF',}
			)]}>
			<Flex align='center'>
				<FlexItem shrink>
					<Link
						style={{padding: 14}}
						onPress={()=>{
							props.navigation.dispatch(props.NavigationActions.back());
						}}>
							<Image
								source={require('../img/icons/Close.png')}
								style={{height: 16, width: 16, resizeMode: 'contain', tintColor: Platform.OS == "ios" ? '#0076FF' : '#000'}}
								/>
					</Link>
				</FlexItem>
				<FlexItem style={{alignItems: 'flex-end', paddingRight: 14}}>
					{props.rightComponent}
				</FlexItem>
			</Flex>
		</View>
	)
}
