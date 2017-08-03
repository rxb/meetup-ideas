import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-primitives';
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
      <ScrollView style={styles.container}>

      	<Stripe>
      		<Bounds>
      			<Section>
      				<Chunk>
			        	<Text style={[styles.text, styles.textPageHead]}>Choose your adventure</Text>
			        </Chunk>
			        <Chunk>
			        	<Text style={[styles.text, styles.textSecondary]}>Test out the experience of starting a new Meetup Group in...</Text>
			        </Chunk>
			    </Section>
			    <Section>
			    	{(['Parents', 'Tech', 'Writing', 'Hiking', 'Running']).map((topic, i)=>{
			    		return(
							<Chunk key={i}>
								<Link
									onPress={()=>{
										navigate('GroupHome')
									}}>
						        	<DumbButton label={topic} />
						        </Link>
					        </Chunk>
			    		);
			    	})}

			    </Section>
	        </Bounds>
       	</Stripe>
      </ScrollView>
    );
  }
}


export default Choose;