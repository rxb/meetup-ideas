import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from '../styles/styles';

import VenueCard from '../components/VenueCard';
import {data, getFoursquareVenues, store} from '../data';


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

const iconOffset = (20 + 16);
const hscrollContainerStyle = {paddingLeft: 24 + iconOffset};
const hintStyle = {paddingLeft: iconOffset}

const Option = (props) => {
	return(
		<Card style={{padding: 12}}>
			{props.children}
		</Card>
	);
}

class Schedule extends React.Component {

	static navigationOptions = ({ navigation }) => ({
		title: 'Schedule',
    headerRight: <Button title="Post" onPress={()=>{navigation.navigate('End')}} />
	});

  constructor(props){
    super(props);
    this.state = {
      venues: [],
      idea: {
      	title: '',
      	agenda: [],
      	when: {},
      	where: {},
      	duration: {}
      }
    }
  }

  componentDidMount(){

    const idea = store.idea
    this.setState({idea: idea});

    getFoursquareVenues(idea.where.categoryId)
      .then((json) => {
        if(json.response && json.response.venues){
          this.setState({venues: json.response.venues});
        }
      });
  }



	render() {

		const { navigate } = this.props.navigation;

		const idea = this.state.idea;
		const agendaString = idea.agenda.map((step, i)=>{
			return `• ${step.label} (${step.minutes} min) ${'\n'}`;
		}).join('');
		const defaultDescription = `What we'll do: ${'\n\n'}${agendaString}`

		return (
			<View style={styles.container}>

			<KeyboardAwareScrollView style={styles.stripeCollection}>
				<Stripe style={styles.stripeCollection}>
					<Bounds>

						<Section style={styles.sectionTable}>
							<Chunk>
								<TextInput defaultValue={idea.title} placeholder="Event title" style={[styles.input, styles.inputBig]} underlineColorAndroid="transparent"  />
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Calendar.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<TextInput placeholder="When?" style={[styles.input]} />
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTableFooter}>
							<List
								variant='hscroll'
								items={idea.when.options}
								hscrollItemStyle={{width: 120, paddingRight: 8}}
								hscrollContainerStyle={hscrollContainerStyle}
								renderItem={(item, i)=>{
									return(
										<Option>
											<Text style={[styles.text, styles.textSmall]}>{item}</Text>
										</Option>
									);
								}}
								/>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Most <Text style={styles.textStrong}>{idea.title}</Text> Meetups happen Weekdays around 10:00am</Text>
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Time.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<TextInput placeholder="How long will it be?" style={[styles.input]} underlineColorAndroid="transparent" />
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTableFooter}>
							<List
								variant='hscroll'
								items={idea.duration.options}
								hscrollItemStyle={{width: 100, paddingRight: 8}}
								hscrollContainerStyle={hscrollContainerStyle}
								renderItem={(item, i)=>{
									return(
										<Option>
											<Text style={[styles.text, styles.textSmall]}>{item}</Text>
										</Option>
									);
								}}
								/>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Most <Text style={[styles.textStrong]}>{idea.title}</Text> Meetups last 2 hours</Text>
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Pin.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<TextInput placeholder="Where?" style={[styles.input]} underlineColorAndroid="transparent" />
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section style={styles.sectionTableFooter}>
							<List
								variant='hscroll'
								items={this.state.venues}
								hscrollItemStyle={{width: 180+8, paddingRight: 8}}
								hscrollContainerStyle={hscrollContainerStyle}
								renderItem={(item, i)=>{
									return(
										<Link
											key={i}
											onPress={()=>{
												store.venueId = item.id;
												navigate('VenueDetail');
											}}>
											<VenueCard venue={item} />
										</Link>
									);
								}}
								/>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Most <Text style={styles.textStrong}>{idea.title}</Text> Meetups happen at library meeting rooms, parks, homes</Text>
							</Chunk>
						</Section>

						<Section style={styles.sectionTable}>
							<Flex>
								<FlexItem shrink>
									<Image
										source={require('../img/icons/Document.png')}
										style={styles.iconInput}
										/>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<TextInput
											placeholder="Event description"
											multiline
											underlineColorAndroid="transparent"
											style={[styles.input]}
											defaultValue={defaultDescription}
											/>
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>
						<Section>
							<Chunk style={hintStyle}>
								<Text style={[styles.text, styles.textSmall, styles.textHint]}>Share what you’ll do, what members should bring, and other important details they should know.</Text>
							</Chunk>
						</Section>


					</Bounds>
				</Stripe>
			</KeyboardAwareScrollView>

			</View>
		);
	}
}


export default Schedule;