import React from 'react';
import { ART, ScrollView } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../styles/styles';

import VenueCard from '../components/VenueCard';


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
  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Stripe>
          <Bounds>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textKicker]}>MEETUP IDEA</Text>
                <Text style={[styles.text, styles.textPageHead]}>Kids Clothing Swap</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSecondary]}>At at a Kids’ Clothing Swap Meetup, parents bring clothes their kids have outgrown or no longer need to trade with other parents. It’s fun and free way to put those old clothes to good use.</Text>
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>43 groups have done this</Text>
              </Chunk>
              <List
                variant='hscroll'
                items={['example 1', 'example 2', 'example 3', 'example 4']}
                hscrollItemStyle={{width: 200, paddingLeft: 16}}
                renderItem={(item, i)=>{
                  return(
                      <View key={i}>
                        <Image
                            source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
                            style={{height: 130, resizeMode: 'cover', borderRadius: 5, marginVertical: 6}}
                           />
                          <Text style={[styles.text, styles.textSmall, styles.textStrong]}>Meetup Playdate</Text>
                          <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Santa Monica Dads</Text>
                          <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>14 attended</Text>
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

                {(['do this', 'do that', 'do the other thing', 'keep going', 'ok stop']).map((step, i)=>{
                  return(
                    <Chunk key={i}>

                      <Flex>
                        <FlexItem shrink>
                          <View style={{width: 17, height: 17, borderRadius: 17, borderWidth: 1, borderColor: '#ccc', backgroundColor: 'white', marginTop: 2}} />
                        </FlexItem>
                        <FlexItem>
                          <Text style={[styles.text, styles.textStrong]} >{step}</Text>
                        </FlexItem>
                        <FlexItem shrink>
                          <Text style={[styles.text, styles.textSecondary, {textAlign: 'right'}]}>10min</Text>
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
                <Text style={[styles.text, styles.textSmall]}>Library meeting rooms, coffee shops, homes</Text>
                <Text style={[styles.text, styles.textSmall]}>Here are some nearby possibilities:</Text>
              </Chunk>

              <List
                variant='hscroll'
                items={['place 1', 'place 2', 'place 3', 'place 4']}
                hscrollItemStyle={{width: 200, paddingLeft: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Link
                      key={i}
                      onPress={()=>{
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