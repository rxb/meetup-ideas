import React from 'react';
import { ScrollView, InteractionManager, Linking} from 'react-native';
import { Animated, Easing, View, Text, Image, StyleSheet } from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Showable from '../components/Showable';
import styles from '../styles/styles';

import { connect } from 'react-redux';
import { toggleTodo } from '../actions';

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

import {data, store} from '../data';



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
			viewportLayout: {},
		}
	}


	componentDidMount() {

			/*
			// show loader
			setTimeout(()=>{
				this.setState({loaderVisible: true});
			*/

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
					}, 2000);

				}, 1000);

			/*
			}, 400);
			*/
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
			Animated.delay(200),
			Animated.timing(
				this.imageOpacity,
				{
					toValue: 0,
					duration: 300,
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
		const {group, user, topic} = this.props;

		return (
			<View style={styles.container}>

			<ScrollView style={styles.container}>

				<Stripe image={group.duotonePhoto} style={{minHeight: 200, justifyContent: 'center', alignItems: 'center'}}>
					<Bounds>
						<Section>
							<Text style={[styles.text, styles.textPageHead, {backgroundColor: 'transparent', color: 'white', fontSize: 26, textAlign: 'center', textShadowColor: 'rgba(0,0,0,.5)', textShadowRadius: 10, textShadowOffset: {width: 1, height: 1}}]}>{group.getName(user.city)}</Text>
						</Section>
					</Bounds>
				</Stripe>

			 <Stripe>
					<Bounds>
						<Section>
							<Chunk style={{paddingBottom: 24,  alignItems: 'center'}}>

									<Image
										source={require('../img/icons/Calendar.png')}
										style={{resizeMode: 'contain', height: 20, width: 20, tintColor: 'gray', marginVertical: 4}}
										/>

										<Text style={[styles.text, styles.textSectionHead, {textAlign: 'center', marginVertical: 7}]}>Ideas for your {group.label} Meetup</Text>
										<Text style={[styles.text, styles.textSecondary, {textAlign: 'center'}]}>Check out some Meetup ideas other {group.label} groups have tried and loved.</Text>


							</Chunk>

							<List
								variant=''
								items={group.ideas}
								renderItem={(idea, i)=>{
									return(
										<Link
											key={i}
											onPress={()=>{
												const ideaIndex = (idea.notFinished) ? 0 : i;
												navigate('IdeaDetail', {ideaIndex, topic})
											}}>
											<Card style={{marginBottom: 16}}>
												<Flex align='center'>
													<FlexItem growFactor={3}>
														<Image
															source={{uri: idea.pastMeetups[0].photo}}
															style={{height: 120, resizeMode: 'cover', borderBottomLeftRadius: 5, borderTopLeftRadius: 5,}}
														 />
													</FlexItem>
													<FlexItem growFactor={5} style={{paddingRight: 16}}>
														<Text style={[styles.text, styles.textKicker, {fontSize: 11, lineHeight: 18, color: 'rgba(0,0,0,.35)'}]}>MEETUP IDEA</Text>
														<Text style={[styles.text, styles.textStrong]} numberOfLines={2}>{idea.title}</Text>
														<Text style={[styles.text, styles.textSmall]}>{idea.howManyGroups} groups have tried this</Text>
													</FlexItem>
												</Flex>
											</Card>
										</Link>
									);
								}}
								/>
							</Section>

							{/* suggest your own idea */}
							<Section>
								<Chunk>
									<Flex>
										<FlexItem>
											<Text style={[styles.text, styles.textStrong]}>Have more ideas for {group.label} Meetups?</Text>
										</FlexItem>
										<FlexItem>
											<Link
												onPress={()=>{
													const subject = `${group.label} Meetup idea to share`;
													const body = `---------------------------------\nHave Meetup ideas to share with\n other ${group.label} groups?\n Let us know!\n---------------------------------\n\n`;
													Linking.openURL(`mailto:ideas@meetup.com?subject=${subject}&body=${body}&cc=richard@meetup.com`);
												}}>
												<DumbButton type="secondary" size="small" label="Share ideas" />
											</Link>
										</FlexItem>
									</Flex>
								</Chunk>
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
						source={{uri: group.photo}}
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
								<Card style={{backgroundColor: 'white'}}>
									<CardSection>
										<Chunk>
											<Text style={[styles.text, styles.textPageHead]}>Welcome to your new {group.label} Meetup Group</Text>
										</Chunk>
										<Chunk>
											<Text style={[styles.text]}>This is the beginning of something big. You're part of a network of 4,234 {group.label} Meetups around the world.</Text>
										</Chunk>
										<Chunk style={{marginTop: 8}}>
											<Link onPress={()=>{
												this.setState({
													hasLoadingContainer: false,
													welcomeVisible: false
												});
												this.cleanUpWelcome();
											}}>
												<DumbButton label="Let's go!" />
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

const mapStateToProps = (state, ownProps) => {
	const { params } = ownProps.navigation.state;
	return ({
  		group: state.groups[params.topic],
  		topic: params.topic,
  		user: state.user
  	});
}

const mapDispatchToProps = {
  // onTodoClick: toggleTodo
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupHome);
