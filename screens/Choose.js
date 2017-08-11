import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/styles';

import {data, store} from '../data';


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


class Choose extends React.Component {
  render() {

  	const { navigate } = this.props.navigation;

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
			    <Section style={[{borderBottomWidth: 0}]}>
			    	{(Object.keys(data)).map((topic, i)=>{
			    		return(
							<Chunk key={i}>
								<Link
									onPress={()=>{
										store.group = data[topic];
										navigate('GroupHome');
									}}>
						        	<DumbButton type='secondary' label={'Start'} style={[{marginTop: 6}]} />
						        </Link>
					        </Chunk>
			    		);
			    	})}
			    </Section>
		</Stripe>
    );
  }
}


export default Choose;