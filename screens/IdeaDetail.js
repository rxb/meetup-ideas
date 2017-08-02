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
                <Text style={[styles.text, styles.textSmall]}>Meetup Idea</Text>
                <Text style={[styles.text, styles.textPageHead]}>Kids Clothing Swap</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text]}>At at a Kids’ Clothing Swap Meetup, parents bring clothes their kids have outgrown or no longer need to trade with other parents. It’s fun and free way to put those old clothes to good use.</Text>
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>43 groups have done this</Text>
              </Chunk>
              <List
                variant='hscroll'
                items={['example 1', 'example 2', 'example 3', 'example 4']}
                hscrollItemStyle={{width: 250, paddingRight: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Card>
                      <Image
                        source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
                        style={{height: 160, resizeMode: 'cover'}}
                       />
                      <Text style={[styles.text]}>{item}</Text>
                    </Card>
                  );
                }}
                />
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Sample Agenda</Text>
              </Chunk>
              <Chunk>
                {(['do this', 'do that', 'do the other thing']).map((step, i)=>{
                  return(
                    <Text style={[styles.text]} key={i}>{step}</Text>
                  );
                })}
              </Chunk>
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
                hscrollItemStyle={{width: 250, paddingRight: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Card>
                      <Image
                        source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
                        style={{height: 100, resizeMode: 'cover'}}
                       />
                      <Text style={[styles.text]}>{item}</Text>
                    </Card>
                  );
                }}
                />
            </Section>

            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Popular days and times</Text>
              </Chunk>
              <Chunk>
                {([
                    'Tuesdays at 10am',
                    'Thursdays at 10am',
                    'Saturdays at 3pm'
                  ]).map((step, i)=>{
                  return(
                    <Text style={[styles.text]} key={i}>{step}</Text>
                  );
                })}
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Meetups scheduled 2 weeks out get the most attendees .</Text>
              </Chunk>

            </Section>
            <View style={{height: 80}}/>
          </Bounds>
        </Stripe>
      </ScrollView>

      <Section style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <Chunk>
          <Link
            onPress={()=>{
              navigate('Schedule')
            }}>
            <DumbButton label="Plan a Meetup like this" />
          </Link>
        </Chunk>
      </Section>
      </View>
    );
  }
}


export default IdeaDetail;