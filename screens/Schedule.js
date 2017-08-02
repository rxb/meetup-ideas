import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-primitives';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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


class Schedule extends React.Component {
  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView style={styles.container}>
        <Stripe>
          <Bounds>

            <Section>
              <Chunk>
                <TextInput placeholder="Event title" style={[styles.input, styles.inputBig]}  />
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <TextInput placeholder="What date?" style={[styles.input]} />
                <TextInput placeholder="What time?" style={[styles.input]} />
              </Chunk>
              <List
                variant='hscroll'
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
                hscrollItemStyle={{width: 100, paddingLeft: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Card>
                      <Text style={[styles.text]}>{item}</Text>
                    </Card>
                  );
                }}
                />
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Most Kids Clothing Swap Meetups happen Weekdays around 10:00am</Text>
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <TextInput placeholder="How long will it be?" style={[styles.input]} />
              </Chunk>
              <List
                variant='hscroll'
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
                hscrollItemStyle={{width: 100, paddingLeft: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Card>
                      <Text style={[styles.text]}>{item}</Text>
                    </Card>
                  );
                }}
                />
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Most Kids Clothing Swap Meetups happen last 2 hours</Text>
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <TextInput placeholder="Where?" style={[styles.input]} />
              </Chunk>
              <List
                variant='hscroll'
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
                hscrollItemStyle={{width: 100, paddingLeft: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Card>
                      <Text style={[styles.text]}>{item}</Text>
                    </Card>
                  );
                }}
                />

              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Most Kids Clothing Swap Meetups happen at library meeting rooms, parks, homes</Text>
              </Chunk>
            </Section>

            <Section>
              <Chunk>
                <TextInput
                  placeholder="Event description"
                  multiline
                  style={[styles.input]}
                  />
              </Chunk>
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Share what you’ll do, what members should bring, and other important details they should know.</Text>
              </Chunk>
            </Section>


            <Section>
              <Chunk>
                <Link
                  onPress={()=>{
                    navigate('VenueDetail')
                  }}>
                  <DumbButton label="Test venue Detail" />
                </Link>
              </Chunk>
            </Section>
          </Bounds>
        </Stripe>
      </KeyboardAwareScrollView>

      </View>
    );
  }
}


export default Schedule;