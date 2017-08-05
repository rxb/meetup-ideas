import React from 'react';
import { ART, ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/styles';

import VenueCard from '../components/VenueCard';

import {data, store, getFoursquareVenues} from '../data';

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


class IdeaDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      venues: [],
      idea: {}
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

    if(!idea.title)
      return false;

    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Stripe>
          <Bounds>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textKicker]}>MEETUP IDEA</Text>
                <Text style={[styles.text, styles.textPageHead]}>{idea.title}</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSecondary]}>{idea.description}</Text>
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>{idea.howManyGroups} groups have done this</Text>
              </Chunk>
              <List
                variant='hscroll'
                items={idea.pastMeetups}
                hscrollItemStyle={{width: 200, paddingRight: 8}}
                renderItem={(item, i)=>{
                  return(
                      <View key={i}>
                        <Image
                            source={{uri: item.photo}}
                            style={{height: 130, resizeMode: 'cover', borderRadius: 5, marginVertical: 6}}
                           />
                          <Text style={[styles.text, styles.textSmall, styles.textStrong]}>{item.title}</Text>
                          <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>{item.groupName}</Text>
                          <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>{item.attended} attended</Text>
                      </View>
                  );
                }}
                />
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Sample Agenda</Text>
              </Chunk>

                <View>
                <View style={{
                  borderLeftColor: '#ccc',
                  borderLeftWidth: 1,
                  width: 20,
                  position: 'absolute',
                  top: 16,
                  bottom: 16,
                  left: 8
                }} />

                {(idea.agenda).map((step, i)=>{
                  return(
                    <Chunk key={i}>

                      <Flex>
                        <FlexItem shrink>
                          <View style={{width: 17, height: 17, borderRadius: 17, borderWidth: 1, borderColor: '#ccc', backgroundColor: 'white', marginTop: 2}} />
                        </FlexItem>
                        <FlexItem>
                          <Text style={[styles.text, styles.textStrong]} >{step.label}</Text>
                        </FlexItem>
                        <FlexItem shrink>
                          <Text style={[styles.text, styles.textSecondary, {textAlign: 'right'}]}>{step.minutes} min</Text>
                        </FlexItem>
                      </Flex>
                    </Chunk>
                  );
                })}
                </View>
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Where to host it</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSmall]}>{idea.where.description}</Text>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Here are some nearby possibilities:</Text>
              </Chunk>

              <List
                variant='hscroll'
                items={this.state.venues}
                hscrollItemStyle={{width: 180+8, paddingRight: 8}}
                renderItem={(item, i)=>{
                  return(
                    <Link
                      key={i}
                      onPress={()=>{
                        store.venueId = item.id;
                        navigate('VenueDetail')
                      }}>
                      <VenueCard venue={item} />
                    </Link>
                  );
                }}
                />
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Popular days and times</Text>
              </Chunk>

                {([
                    'Tuesdays at 10am',
                    'Thursdays at 10am',
                    'Saturdays at 3pm'
                  ]).map((step, i)=>{
                  return(
                    <Chunk key={i}>
                      <Flex>
                        <FlexItem shrink>
                          <View style={{width: 8, height: 8, borderRadius: 17, backgroundColor: 'black', marginTop: 7}} />
                        </FlexItem>
                        <FlexItem>
                          <Text style={[styles.text]}>{step}</Text>
                        </FlexItem>
                      </Flex>
                    </Chunk>
                  );
                })}

              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Meetups scheduled 2 weeks out get the most attendees .</Text>
              </Chunk>

            </Section>
            <View style={{height: 80}}/>
          </Bounds>
        </Stripe>
      </ScrollView>


      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <Link
            onPress={()=>{
              navigate('Schedule')
            }}>
            <DumbButton label="Plan a Meetup like this" style={[styles['button--edge']]} />
          </Link>
      </View>

      </View>
    );
  }
}


export default IdeaDetail;