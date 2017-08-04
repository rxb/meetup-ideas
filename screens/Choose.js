import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
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
			        	<Text style={[styles.text, styles.textPageHead]}>Let's pretend</Text>
			        </Chunk>
			        <Chunk>
			        	<Text style={[styles.text, styles.textSecondary]}>Imagine you've just started a Meetup Group in one of these topics...</Text>
			        </Chunk>
			    	{(['Parents', 'Tech', 'Writing', 'Hiking', 'Running']).map((topic, i)=>{
			    		return(
							<Chunk key={i}>
								<Link
									onPress={()=>{
										navigate('GroupHome')
									}}>
						        	<DumbButton label={topic} style={{marginTop: 6}} />
						        </Link>
					        </Chunk>
			    		);
			    	})}

			    </Section>
			  </Bounds>
		</Stripe>
      	<Stripe style={[styles.stripeCollection]}>
      		<Bounds>
      			<Section>
			    	 <Chunk>
			        	<Text style={[styles.text, styles.textSectionHead]}>About this prototype</Text>
			        </Chunk>
			         <Chunk>
			         	<Text style={[styles.text]}>This will be a description of what this project is all about.</Text>
			         </Chunk>
			    </Section>
	        </Bounds>
       	</Stripe>
      </ScrollView>
    );
  }
}


export default Choose;