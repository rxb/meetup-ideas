import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
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


class VenueDetail extends React.Component {
  render() {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Stripe>
            <List
                variant='hscroll'
                items={['example 1', 'example 2', 'example 3', 'example 4']}
                hscrollItemStyle={{width: 250, borderLeftWidth: 1, borderLeftColor: 'white'}}
                renderItem={(item, i)=>{
                  return(
                      <Image
                        source={{uri: 'https://c2.staticflickr.com/6/5590/15229315615_95d06272ce_z.jpg'}}
                        style={{height: 160, resizeMode: 'cover'}}
                       />
                  );
                }}
                />

          <Bounds>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textKicker]}>VENUE IDEA</Text>
                <Text style={[styles.text, styles.textPageHead]}>Venue Detail</Text>
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSmall]}>$$$ • Coffee Shop</Text>
              </Chunk>
            </Section>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSmall]}>Coffee, tea, baked goods & desserts in a quirky, brick-walled space with outdoor tables.</Text>
              </Chunk>
            </Section>
            <Section>
              <Flex>
                <FlexItem growFactor={1}>
                  <Chunk>
                    <Text style={[styles.text, styles.textSecondary]}>Address</Text>
                  </Chunk>
                </FlexItem>
                <FlexItem growFactor={3}>
                  <Chunk>
                    <Text style={[styles.text]}>35 Puritan Ln</Text>
                    <Text style={[styles.text]}>Stamford, CT 06906</Text>
                  </Chunk>
                </FlexItem>
              </Flex>
              <Flex>
                <FlexItem growFactor={1}>
                  <Chunk>
                    <Text style={[styles.text, styles.textSecondary]}>Hours</Text>
                  </Chunk>
                </FlexItem>
                <FlexItem growFactor={3}>
                  <Chunk>
                    {(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).map((day, i)=>{
                      return(
                        <Flex key={i}>
                          <FlexItem>
                            <Text style={[styles.text]}>{day}</Text>
                          </FlexItem>
                          <FlexItem>
                            <Text style={[styles.text]}>7am - 11pm</Text>
                          </FlexItem>
                        </Flex>
                      );
                    })}
                  </Chunk>
                </FlexItem>
              </Flex>
              <Flex>
                <FlexItem growFactor={1}>
                  <Chunk>
                    <Text style={[styles.text, styles.textSecondary]}>Phone</Text>
                  </Chunk>
                </FlexItem>
                <FlexItem growFactor={3}>
                  <Chunk>
                    <Text style={[styles.text]}>(412) 921-1613</Text>
                  </Chunk>
                </FlexItem>
              </Flex>
            </Section>
            <Section>
              <Chunk>
                <Link onPress={()=>{
                    alert('Calling venue...');
                  }}>
                  <DumbButton label="Call venue" />
                </Link>
              </Chunk>
            </Section>
          </Bounds>
        </Stripe>
      </ScrollView>
    );
  }
}


export default VenueDetail;