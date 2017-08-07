import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import { NavigationActions } from 'react-navigation'
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


class Choose extends React.Component {
  render() {

  	const { navigate } = this.props.navigation;

    return (
     <Stripe style={[styles.container, {flex: 1, justifyContent: 'center'}]}>
      			<Section>
      				<Chunk>
						<Text style={[styles.text, styles.textSectionHead, {textAlign: 'center'}]}>Nice work!</Text>
      				</Chunk>
      				<Chunk>
			        	<Text style={[styles.text, styles.textSecondary, {textAlign: 'center'}]}>This is where your newly-scheduled event would appear.</Text>
			        </Chunk>
			    </Section>
			    <Section style={[{borderBottomWidth: 0}]}>
			    	<Chunk>
						<Link
							onPress={()=>{
								Linking.openURL('mailto: richard@meetup.com');
							}}>
				        	<DumbButton type='secondary' label='Send prototype feedback' style={[{marginTop: 6}]} />
				        </Link>
			        </Chunk>
			        <Chunk>
						<Link
							onPress={()=>{
								// key: 1 refers to the regular stacknavigator
								const resetAction = NavigationActions.reset({
						            index: 0,
						            actions: [
						                NavigationActions.navigate({ routeName: 'Choose' }),
						            ],
						            key: 1
						        });
								this.props.navigation.dispatch(resetAction);
							}}>
				        	<DumbButton label='Try it again' style={[{marginTop: 6}]} />
				        </Link>
			        </Chunk>
			    </Section>
		</Stripe>
    );
  }
}


export default Choose;