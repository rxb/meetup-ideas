import React from 'react';
import { ScrollView, InteractionManager} from 'react-native';
import { Animated, Easing, View, Text, Image, StyleSheet } from 'react-primitives';
import styles from '../styles/styles';

import Confetti from 'react-native-confetti';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import Showable from '../components/Showable';

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
	CardSection,
	Chip,
	Inline,
	Tabs,
	Link,
	Modal,
	Toast,
} from '../basecomponents';


const groupImage = 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg';

class GroupHome extends React.Component {


 	static navigationOptions = {

 		headerTintColor: 'white',
    headerStyle: {
    	backgroundColor: 'transparent',
    	position: 'absolute',
    	top: 0,
    	left: 0,
    	right: 0
    }
  }



	constructor () {
		super()
		this.imageScale = new Animated.Value(1);
		this.imageOpacity = new Animated.Value(0);
		this.imageBottom = new Animated.Value(0);
		this.cleanUpWelcome = this.cleanUpWelcome.bind(this);
		this.state = {
			welcomeVisible: false,
			loaderVisible: false,
			hasWelcomeContainer: true,
			hasLoadingContainer: true,
			viewportLayout: {}
		}
	}


	componentDidMount() {

			// show loader
			setTimeout(()=>{
				this.setState({loaderVisible: true});

				// hide loader, continue
				setTimeout(()=>{

					this.setState({loaderVisible: false});

					// reveal group photo
					Animated.parallel([
						Animated.timing(
							this.imageScale,
							{
								toValue: 1.2,
								duration: 10000,
								easing: Easing.inOut(Easing.quad),
								useNativeDriver: false
							}
						),
						Animated.timing(
							this.imageOpacity,
							{
								toValue: 1,
								duration: 1200,
								easing: Easing.ease,
								useNativeDriver: false
							}
						),
					]).start();

					// show welcome modal
					setTimeout(()=>{
						this.setState({welcomeVisible: true});
					}, 1400);

				}, 4000);

			}, 400);
	}



	cleanUpWelcome(){
		const cleanUpDuration = 500;

		Animated.sequence([
			Animated.delay(500),
			Animated.parallel([
				Animated.timing(
					this.imageScale,
					{
						toValue: 1,
						duration: cleanUpDuration,
						easing: Easing.inOut(Easing.quad),
					}
				),
				Animated.timing(
					this.imageBottom,
					{
						toValue: this.state.viewportLayout.height - 200,
						duration: cleanUpDuration,
						easing: Easing.inOut(Easing.quad),
					}
				),
			]),
			Animated.timing(
				this.imageOpacity,
				{
					toValue: 0,
					duration: 500,
				}
			),
		]).start(()=>{
			this.setState({
				hasWelcomeContainer: false
			});
		});
	}


	render() {

		const { navigate } = this.props.navigation;

		return (
			<View style={styles.container}>

			<ScrollView style={styles.container}>

				<Stripe image={groupImage} style={{minHeight: 200, justifyContent: 'center', alignItems: 'center'}}>
					<Bounds>
						<Section>
								<Text style={[styles.text, styles.textPageHead, {backgroundColor: 'transparent', color: 'white', }]}>Some group name</Text>
						</Section>
					</Bounds>
				</Stripe>

			 <Stripe>
					<Bounds>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textSectionHead]}>Parenting Meetup ideas</Text>
								<Text style={[styles.text, styles.textSmall]}>See what other groups have tried and loved</Text>
							</Chunk>
							<List
								variant=''
								items={['idea 1', 'idea 2', 'idea 3', 'idea 4', 'idea 1', 'idea 2', 'idea 3', 'idea 4']}
								renderItem={(item, i)=>{
									return(
										<Link
											key={i}
											onPress={()=>{
												navigate('IdeaDetail')
											}}>
											<Card style={{marginVertical: 8}}>
												<Flex align='center'>
													<FlexItem growFactor={1}>
														<Image
															source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
															style={{height: 100, resizeMode: 'cover'}}
														 />
													</FlexItem>
													<FlexItem growFactor={2}>
														<Text style={[styles.text, styles.textStrong]}>{item}</Text>
														<Text style={[styles.text]}>15 groups have tried this</Text>
													</FlexItem>
												</Flex>
											</Card>
										</Link>
									);
								}}
								/>
						</Section>

					</Bounds>
				</Stripe>

			</ScrollView>

			{ this.state.hasLoadingContainer &&
				 <View style={[styles.container, styles.absoluteFill, styles.absoluteCenter, {backgroundColor: 'black'}]}>

						<Showable visible={this.state.loaderVisible} style={{alignItems: 'center'}}>
							<View style={{marginBottom: 24}}>
								<Bubbles size={10} color="#FFF" />
							</View>
							<Chunk>
								<Text style={[styles.text, styles.textSmall, {color: 'rgba(255,255,255,.5)'}]}>building your new Meetup Group</Text>
							</Chunk>
						</Showable>

				 </View>
			}

			{ this.state.hasWelcomeContainer &&
				<View
					style={[styles.container, styles.absoluteFill ]}
					onLayout={(event) =>{
						this.setState({viewportLayout: event.nativeEvent.layout});
					}}
					>

					<Animated.Image
						source={{uri: groupImage}}
						style={[
							styles.container,
							styles.absoluteCenter,
							{
								position: 'absolute',
								resizeMode: 'cover',
								transform: [{scale: this.imageScale}],
								opacity: this.imageOpacity,
								bottom: this.imageBottom,
								top: 0,
								left: 0,
								right: 0,
							}
						]}
						/>

						<View style={[styles.absoluteFill, styles.absoluteCenter, {paddingHorizontal: 24} ]}>
							<Showable visible={this.state.welcomeVisible}>
								<Card>
									<CardSection>
										<Chunk>
											<Text style={[styles.text, styles.textPageHead]}>Welcome to your new group!</Text>
										</Chunk>
										<Chunk>
											<Text style={[styles.text]}>This is inspirational copy. You're a part of network of Hiking Meetups, 4,234 strong. Sharing, and helping each other and whatevs.</Text>
										</Chunk>
										<Chunk>
											<Link onPress={()=>{
												this.setState({
													hasLoadingContainer: false,
													welcomeVisible: false
												});
												this.cleanUpWelcome();
											}}>
												<DumbButton label="ok let's do this" />
											</Link>
										</Chunk>
									</CardSection>
								</Card>
							</Showable>
						</View>
				 </View>
				}

			</View>
		);
	}
}


export default GroupHome;