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


class GroupHome extends React.Component {
  render() {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Stripe image="https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg" style={{minHeight: 200}}>
          <Bounds>
            <Section>
              <Chunk>

              </Chunk>
            </Section>
          </Bounds>
        </Stripe>

       <Stripe>
          <Bounds>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textPageHead]}>Some group name</Text>
              </Chunk>
            </Section>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSectionHead]}>Meetup ideas</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSmall]}>See what other groups have tried and loved</Text>
              </Chunk>
              <List
                variant=''
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
                renderItem={(item, i)=>{
                  return(
                    <Card>
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
                  );
                }}
                />
            </Section>


            <Section>
              <Chunk>
            		<Link
            			onPress={()=>{
            				navigate('IdeaDetail')
            			}}>
                	<DumbButton label="Idea Detail" />
                </Link>
              </Chunk>
            </Section>
          </Bounds>
        </Stripe>

      </ScrollView>
    );
  }
}


export default GroupHome;