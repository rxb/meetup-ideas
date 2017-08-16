import React from 'react';
import { ART, ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/styles';
import moment from 'moment';

import VenueCard from '../components/VenueCard';
import TrailCard from '../components/TrailCard';


import {
  resetSchedule,
  setScheduleWhere,
  setScheduleWhen,
  setScheduleDuration
} from '../actions';
import { connect } from 'react-redux';
import {data, getFoursquareVenues, daysOfWeekPlural, getHikingProjectTrails} from '../data';

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
      trails: []
    }
  }

  componentDidMount(){
    getFoursquareVenues(this.props.idea.where.categoryId, this.props.idea.where.radiusMeters, this.props.user.latitude, this.props.user.longitude)
      .then((venues) => {
          this.setState({venues: venues});
      });

    /*
    // test hiking trails
    getHikingProjectTrails(this.props.user.latitude, this.props.user.longitude)
      .then((trails) => {
          this.setState({trails: trails});
      });
    */
  }

  render() {

    const { navigate } = this.props.navigation;

    const idea = this.props.idea;

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

                { (idea.agenda).map((step, i)=>{
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
                          { step.minutes > 0 &&
                            <Text style={[styles.text, styles.textSecondary, {textAlign: 'right'}]}>{step.minutes} min</Text>
                          }
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
                {this.state.venues && this.state.venues.length > 0 &&
                  <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Here are some nearby possibilities:</Text>
                }
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
                        navigate('VenueDetail', {
                          venueId: item.id,
                          ideaIndex: this.props.ideaIndex,
                          notFromSchedule: true
                        });
                      }}>
                      <VenueCard venue={item} />
                    </Link>
                  );
                }}
                />


              {/* TESTING TRAIL API */}
              { this.state.trails.length > 0 &&
              <List
                variant='hscroll'
                items={this.state.trails}
                hscrollItemStyle={{width: 180+8, paddingRight: 8}}
                renderItem={(item, i)=>{
                  return(
                    <Link
                      key={i}
                      onPress={()=>{
                        navigate('TrailDetail', {
                          venueId: item.id,
                          ideaIndex: this.props.ideaIndex,
                          notFromSchedule: true
                        });
                      }}>
                      <TrailCard trail={item} />
                    </Link>
                  );
                }}
                />
              }

            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Popular days and times</Text>
              </Chunk>

                {(idea.when.options).map((item, i)=>{
                  return(
                    <Chunk key={i}>
                      <Flex>
                        <FlexItem shrink>
                          <View style={{width: 8, height: 8, borderRadius: 17, backgroundColor: 'black', marginTop: 7}} />
                        </FlexItem>
                        <FlexItem>
                          <Text style={[styles.text]}>{daysOfWeekPlural[item.day]} at {(item.hour <= 12) ? item.hour : item.hour-12}{(item.hour < 12) ? 'am' : 'pm'}</Text>
                        </FlexItem>
                      </Flex>
                    </Chunk>
                  );
                })}

              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Meetups scheduled 2 weeks out get the most attendees.</Text>
              </Chunk>

            </Section>
            { idea.tips &&
              <Section>
                <Chunk>
                  <Text style={[styles.text, styles.textSectionHead]}>Tips</Text>
                </Chunk>
                {idea.tips.map((tip, i)=>{
                  return(
                    <Chunk style={{paddingTop: 8}} key={i}>
                      <Flex>
                        <FlexItem shrink>
                          <Image
                            source={{uri: tip.authorPhoto}}
                            style={{width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'}}
                            />
                        </FlexItem>
                        <FlexItem>
                          <Text style={[styles.text]}>&ldquo;{tip.quote}&rdquo;</Text>
                          <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>{tip.authorName} • {tip.authorGroupName}</Text>
                        </FlexItem>
                      </Flex>
                    </Chunk>
                  );
                })}
              </Section>
            }

            <View style={{height: 80}}/>
          </Bounds>
        </Stripe>
      </ScrollView>


      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, padding: 6}} elevation={3}>
          <Link
            onPress={()=>{
              this.props.resetSchedule();
              navigate('Schedule', {ideaIndex: this.props.ideaIndex, topic: this.props.topic})
            }}>
            <DumbButton label="Plan a Meetup like this" style={styles.shadow} elevation={3}  />
          </Link>
      </View>

      </View>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.navigation.state;
  return ({
    ideaIndex: params.ideaIndex,
    topic: params.topic,
    group: state.groups[params.topic],
    idea: state.groups[params.topic].ideas[params.ideaIndex],
    user: state.user
  });
}



export default connect(
  mapStateToProps,
  {resetSchedule}
)(IdeaDetail);
