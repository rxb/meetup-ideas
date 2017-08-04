import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from './styles/styles';

import DumbButton from './basecomponents/DumbButton';
import Stripe from './basecomponents/Stripe';
import Bounds from './basecomponents/Bounds';
import Section from './basecomponents/Section';
import Chunk from './basecomponents/Chunk';
import Flex from './basecomponents/Flex';
import FlexItem from './basecomponents/FlexItem';
import Avatar from './basecomponents/Avatar';
import Icon from './basecomponents/Icon';
//import TextInput from './basecomponents/TextInput';
//import Picker from './basecomponents/Picker';
import List from './basecomponents/List';
import Card from './basecomponents/Card';
import Chip from './basecomponents/Chip';
import Inline from './basecomponents/Inline';
import Tabs from './basecomponents/Tabs';
import Link from './basecomponents/Link';
import Modal from './basecomponents/Modal';
import Toast from './basecomponents/Toast';

import { MapView } from 'expo';


const people = [
	{name: 'Sally Somebody'},
	{name: 'Norman Nobody'},
	{name: 'Evan Everybody'},
	{name: 'Walt Whatever'},
	{name: 'Fred Fakeperson'},
	{name: 'Andy Avatar'}
]


class Catalog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedPerson: 0,
			showModal: false
		}
	}


	render() {

		const { navigate } = this.props.navigation;

		return(
			<View>
				<Stripe image="https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg" style={{minHeight: 250}}>
					<Bounds>
						<Section>
							<Chunk>

							</Chunk>
						</Section>
					</Bounds>
				</Stripe>


				<MapView
			        style={{flex: 1, height: 200}}
			        initialRegion={{
			          latitude: 37.78825,
			          longitude: -122.4324,
			          latitudeDelta: 0.0922,
			          longitudeDelta: 0.0421,
			        }}
			      >
					<MapView.Polyline
		              key={'someline'}
		              coordinates={[
		              	{ latitude: 37.78825, longitude: -122.4324 },
		              	{ latitude: 37.78825 + 0.04, longitude: -122.4324 + 0.02 }
		              ]}
		              strokeColor="red"
		              fillColor="rgba(255,0,0,0.5)"
		              strokeWidth={2}
		            />

			    </MapView>


				<Stripe>
					<Bounds>


						<Section>
							<Chunk>
								<Flex switchDirection="medium">
									<FlexItem shrink>
										<Icon shape='download-cloud' color="red" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='sun' color="green" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='trending-up' color="blue" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='feather' color="black" />
									</FlexItem>
								</Flex>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textPageHead]}>Here we go!</Text>
							</Chunk>
							<Chunk>
								<Text style={styles.text}>Please work</Text>
								<Text style={[styles.text, styles.textSecondary]}>Please work</Text>
							</Chunk>
							<Chunk inline>
								<Chip label="Popular" />
								<Chip label="Popular" />
							</Chunk>
						</Section>


						<Section>
							<Flex switchDirection="medium">
								<FlexItem>
									<Chunk>
										<Link
											onPress={()=>{
												navigate('Home')
											}}>
												<DumbButton label="Do it!" />
										</Link>
									</Chunk>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<DumbButton label="Don't do it" />
									</Chunk>
								</FlexItem>
							</Flex>
							<Flex direction="column" switchDirection="medium">
								<FlexItem>
									<Chunk>
										<DumbButton label="Upload" shape='upload-cloud' />
									</Chunk>
								</FlexItem>
								<FlexItem growFactor={2}>
									<Chunk>
										<DumbButton label="Download" shape='download-cloud' />
									</Chunk>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<DumbButton label="Get crazy" shape='zap' />
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>


						<Section>
							<Card>
								<Section style={{alignItems: 'center'}}>
									<Chunk>
										<Avatar
											size='large'
											source={{uri: `https://randomuser.me/api/portraits/women/${this.state.selectedPerson}.jpg`}}
											/>
									</Chunk>
									<Chunk>
										<Text style={[styles.text]}>{people[this.state.selectedPerson].name}</Text>
									</Chunk>
								</Section>
							</Card>
						</Section>


						<Section>
							<Chunk>
								<Tabs
									onChange={(tabValue)=>{
										this.setState({
											tabValue: tabValue,
											listVariant: tabValue
										})
									}}
									fullWidth
									selectedValue={this.state.tabValue}
									>
									<Tabs.Item value="" label="Default" />
									<Tabs.Item value="hscroll" label="Hscroll" />
									<Tabs.Item value="grid" label="Grid" />
								</Tabs>
							</Chunk>


							<List
								variant={this.state.listVariant}
								items={people}
								hscrollItemStyle={{width: 300, paddingRight: 16}}
								renderItem={(item, i)=>{
									return(
										<Flex>
											<FlexItem shrink>
												<Chunk>
													<Avatar source={{uri: `https://randomuser.me/api/portraits/women/${i}.jpg`}} />
												</Chunk>
											</FlexItem>
											<FlexItem>
												<Chunk>
													<Link
														onPress={()=>{
															this.setState({selectedPerson: i})
														}}>
														<View>
														<Text style={[styles.text, styles.textStrong]}>{item.name}</Text>
														<Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
														</View>
													</Link>
												</Chunk>
											</FlexItem>
											<FlexItem shrink>
												<Link
													onPress={()=>{
														alert(`Hey, ${item.name}!`);
													}}>
														<Icon shape='more-vertical' color="gray" />
												</Link>
											</FlexItem>
										</Flex>
									);
								}}
								/>
						</Section>
					</Bounds>
				</Stripe>




				<Modal
					visible={this.state.showModal}
					onRequestClose={ () => this.setState({showModal: false}) }
					>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textPageHead]}>Modal</Text>
							</Chunk>
							<Chunk>
								<Text style={[styles.text]}>Hey y'all I'm a modal</Text>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Link
									onPress={()=>{
										this.setState({showModal: false});
									}}>
										<DumbButton label="Let's do this" />
								</Link>
							</Chunk>
						</Section>
				</Modal>


			</View>

		);

		return(
			<View>
				<Stripe>
					<Bounds>
						<Chunk>
							<Text></Text>
						</Chunk>
						<Chunk>
							<Text style={[styles.text, styles.textPageHead]}>Here we go!</Text>
						</Chunk>
					</Bounds>
				</Stripe>

				<Stripe>
					<Bounds>
						<Section>
							<Chunk>
								<Flex switchDirection="medium">
									<FlexItem shrink>
										<Icon shape='download-cloud' color="red" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='sun' color="green" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='trending-up' color="blue" />
									</FlexItem>
									<FlexItem shrink>
										<Icon shape='feather' color="black" />
									</FlexItem>
								</Flex>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textPageHead]}>Here we go!</Text>
							</Chunk>
							<Chunk>
								<Text style={styles.text}>Please work</Text>
								<Text style={[styles.text, styles.textSecondary]}>Please work</Text>
							</Chunk>
							<Chunk inline>
								<Chip label="Popular" />
								<Chip label="Popular" />
							</Chunk>
						</Section>
						<Section>
							<Flex switchDirection="medium">
								<FlexItem>
									<Chunk>
										<Link
											onPress={()=>{
												this.setState({showModal: !this.state.showModal});
											}}>
												<DumbButton label="Do it" />
										</Link>
									</Chunk>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<DumbButton label="Don't do it" />
									</Chunk>
								</FlexItem>
							</Flex>
							<Flex direction="column" switchDirection="medium">
								<FlexItem>
									<Chunk>
										<DumbButton label="Upload" shape='upload-cloud' />
									</Chunk>
								</FlexItem>
								<FlexItem growFactor={2}>
									<Chunk>
										<DumbButton label="Download" shape='download-cloud' />
									</Chunk>
								</FlexItem>
								<FlexItem>
									<Chunk>
										<DumbButton label="Get crazy" shape='zap' />
									</Chunk>
								</FlexItem>
							</Flex>
						</Section>

						<Section>
							<Card>
								<Section style={{alignItems: 'center'}}>
									<Chunk>
										<Avatar
											size='large'
											source={{uri: `https://randomuser.me/api/portraits/women/${this.state.selectedPerson}.jpg`}}
											/>
									</Chunk>
									<Chunk>
										<Text style={[styles.text]}>Oh look it's a card</Text>
									</Chunk>
								</Section>
							</Card>
						</Section>

						<Section>
							<Chunk>
								<Tabs
									onChange={(tabValue)=>{
										this.setState({
											tabValue: tabValue,
											listVariant: tabValue
										})
									}}
									fullWidth
									selectedValue={this.state.tabValue}
									>
									<Tabs.Item value="" label="Default" />
									<Tabs.Item value="hscroll" label="Hscroll" />
									<Tabs.Item value="grid" label="Grid" />
								</Tabs>
							</Chunk>

							{/*
								- 			linear list
								inline	 	inline block list
								hscroll 	scrolling inline block list
								grid		grid list

							*/}

							<List
								variant={this.state.listVariant}
								items={people}
								renderItem={(item, i)=>{
									return(
										<Flex>
											<FlexItem shrink>
												<Chunk>
													<Avatar source={{uri: `https://randomuser.me/api/portraits/women/${i}.jpg`}} />
												</Chunk>
											</FlexItem>
											<FlexItem>
												<Chunk>
													<Link
														onPress={()=>{
															this.setState({selectedPerson: i})
														}}>
														<View>
														<Text style={[styles.text, styles.textStrong]}>{item.name}</Text>
														<Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
														</View>
													</Link>
												</Chunk>
											</FlexItem>
											<FlexItem shrink>
												<Link
													onPress={()=>{
														alert(`Hey, ${item.name}!`);
													}}>
														<Icon shape='more-vertical' color="gray" />
												</Link>
											</FlexItem>
										</Flex>
									);
								}}
								/>

						</Section>
						{/*
						<Section>
							<Chunk>
								<Picker style={[styles.input, styles.text]}>
									{ (['option one', 'option two', 'option three', 'option four']).map((item, i)=>{
										return(
											<Picker.Item value={item} label={item} />
										);
									}) }
								</Picker>
							</Chunk>
							<Chunk>
								<TextInput
									placeholder="Hey I'm a text input"
									/>
							</Chunk>
							<Chunk>
								<TextInput
									multiline
									placeholder="Hey I'm a multiline text input (aka textarea)"
									/>
							</Chunk>
						</Section>
						*/}


					</Bounds>
				</Stripe>

				<Stripe image="https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg" style={{minHeight: 250}}>
					<Bounds>
						<Section>
							<Chunk>
								{/* some stuff? */}
							</Chunk>
						</Section>
					</Bounds>
				</Stripe>

				<Modal
					visible={this.state.showModal}
					onRequestClose={ () => this.setState({showModal: false}) }
					>
						<Section>
							<Chunk>
								<Text style={[styles.text, styles.textPageHead]}>Modal</Text>
							</Chunk>
							<Chunk>
								<Text style={[styles.text]}>Hey y'all I'm a modal</Text>
							</Chunk>
						</Section>
						<Section>
							<Chunk>
								<Link
									onPress={()=>{
										this.setState({showModal: false});
									}}>
										<DumbButton label="Let's do this" />
								</Link>
							</Chunk>
						</Section>
				</Modal>

				<Toast />

			</View>

		);
	}
};

export default Catalog;