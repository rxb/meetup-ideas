import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import styles from '../styles/styles';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import {
  resetSchedule,
  setScheduleWhere,
} from '../actions';
import {data, getFoursquareVenue} from '../data';


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


class VenueDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      venue: {}
    }
  }


 componentDidMount(){
    getFoursquareVenue(this.props.venueId)
      .then((json) => {
        if(json.response && json.response.venue){
          this.setState({venue: json.response.venue});
          console.log(json.response.venue);
        }
      });
  }

  render() {

    const { navigate } = this.props.navigation;

    const venueImages = [];

    // if not loaded yet, push some dummy images
    if(!this.state.venue.name){
      venueImages.push(['','','']);
    }

    // get foursquare images
    if(this.state.venue.photos && this.state.venue.photos.groups.length > 0){
      venueImages.push(...this.state.venue.photos.groups[0].items)
    };

    // get static map image
    let mapLinking;
    if(this.state.venue && this.state.venue.location){
      const mapUri = `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.venue.location.lat},${this.state.venue.location.lng}&markers=color:red|${this.state.venue.location.lat},${this.state.venue.location.lng}&zoom=13&size=250x180&maptype=terrain&scale=2&key=AIzaSyAibsbqDXjn8sl5f3h4G2GvmxheyGAbX3M`;
      venueImages.push( {type: 'map', uri: mapUri});

      mapLinking = (Platform.OS == 'android') ? `geo:${this.state.venue.location.lat},${this.state.venue.location.lng}` : `http://maps.apple.com/?sll=${this.state.venue.location.lat},${this.state.venue.location.lng}&q=${this.state.venue.name}`;
    }

    return (
      <View style={styles.container}>
      <View style={[{height: 64, backgroundColor: '#EFEFF2', paddingTop: 34, paddingLeft: 14}]}>
        <Link
            onPress={()=>{
              this.props.navigation.dispatch(NavigationActions.back());
            }}>
              <Image
                source={require('../img/icons/Close.png')}
                style={{height: 16, width: 16, resizeMode: 'contain', tintColor: '#0076FF'}}
                />
          </Link>
      </View>
      <ScrollView style={styles.container}>
        <Stripe>
          { venueImages.length > 1 &&
          <List
              variant='hscroll'
              items={ venueImages }
              style={{backgroundColor: '#555'}}
              hscrollItemStyle={[ {width: 250, borderLeftWidth: 1, borderLeftColor: 'white'}]}
              renderItem={(item, i)=>{
                const uri = (item.type == 'map') ? item.uri : `${item.prefix}300x500${item.suffix}`;
                return(
                    <Image
                      source={{uri: uri}}
                      style={{height: 180, resizeMode: 'cover'}}
                     />
                );
              }}
              />
          }

          { venueImages.length == 1 &&
              <Image
                source={{uri: venueImages[0].uri}}
                style={{height: 180, resizeMode: 'cover'}}
               />
          }

          <Bounds>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textKicker]}>VENUE IDEA</Text>
                <Text style={[styles.text, styles.textPageHead]}>{this.state.venue.name}</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSmall]}>{
                  this.state.venue.categories && this.state.venue.categories.map((cat, i)=>{
                    return(
                      <Text key={i}>{cat.shortName}{(i<(this.state.venue.categories.length-1))? ', ' : ' '}</Text>
                    );
                  })
                }</Text>
              </Chunk>
            </Section>
            { this.state.venue.description &&
              <Section>
                <Chunk>
                  <Text style={[styles.text, styles.textSmall]}>{this.state.venue.description}</Text>
                </Chunk>
              </Section>
            }


            <Section>

              { this.state.venue.location &&
              <Flex>
                <FlexItem growFactor={1}>
                  <Chunk>
                    <Text style={[styles.text, styles.textSecondary]}>Address</Text>
                  </Chunk>
                </FlexItem>
                <FlexItem growFactor={3}>
                    <Link onPress={()=>{
                      Linking.openURL(mapLinking);
                      }}>
                      <Chunk>
                        <Text style={[styles.text]}>{this.state.venue.location.address}</Text>
                        <Text style={[styles.text]}>{this.state.venue.location.city}, {this.state.venue.location.state}</Text>
                      </Chunk>
                    </Link>
                </FlexItem>
              </Flex>
              }

              { this.state.venue.hours &&
              <Flex>
                <FlexItem growFactor={1}>
                  <Chunk>
                    <Text style={[styles.text, styles.textSecondary]}>Hours</Text>
                  </Chunk>
                </FlexItem>
                <FlexItem growFactor={3}>
                  <Chunk>
                    {(this.state.venue.hours.timeframes).map((timeframe, i)=>{
                      return(
                        <Flex key={i}>
                          <FlexItem growFactor={1}>
                            <Text style={[styles.text]}>{timeframe.days}</Text>
                          </FlexItem>
                          <FlexItem growFactor={2}>
                            <Chunk>
                            { timeframe.open.map((o, i)=>{
                              return(
                                  <Text key={i} style={[styles.text, styles.textSecondary]}>{o.renderedTime}</Text>
                              )
                            })}
                            </Chunk>

                          </FlexItem>
                        </Flex>
                      );
                    })}
                  </Chunk>
                </FlexItem>
              </Flex>
              }

              {this.state.venue.contact && this.state.venue.contact.phone &&
                <Flex>
                  <FlexItem growFactor={1}>
                    <Chunk>
                      <Text style={[styles.text, styles.textSecondary]}>Phone</Text>
                    </Chunk>
                  </FlexItem>
                  <FlexItem growFactor={3}>
                    <Chunk>
                      <Text style={[styles.text]}>{this.state.venue.contact.formattedPhone}</Text>
                    </Chunk>
                  </FlexItem>
                </Flex>
              }
            </Section>
            {this.state.venue.contact && this.state.venue.contact.phone &&
              <Section style={{borderBottomWidth: 0}}>
                <Chunk>
                  <Link onPress={()=>{
                    Linking.openURL('tel: +13234450914');
                    }}>
                    <DumbButton type="secondary" label="Call venue" />
                  </Link>
                </Chunk>
              </Section>
            }
            <View style={{height: 80}}/>
          </Bounds>
        </Stripe>
      </ScrollView>

      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <Link
            onPress={()=>{
              this.props.setScheduleWhere(this.state.venue);
              //navigate('Schedule', {ideaIndex: this.props.ideaIndex})
              //this.props.navigation.dispatch(NavigationActions.back());

              this.props.navigation.dispatch({
                      type: 'Navigation/BACK',
                      index: 0,
                      actions: [{ type: 'Navigate', routeName: 'Schedule' }]
              })

            }}>
            <DumbButton label="Pick this venue" style={[styles['button--edge']]} />
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
    venueId: params.venueId
  });
}

const actionCreators = {
  resetSchedule,
  setScheduleWhere,
}

export default connect(
  mapStateToProps,
  actionCreators
)(VenueDetail);