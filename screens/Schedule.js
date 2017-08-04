import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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


const Option = (props) => {
  return(
    <Card style={{padding: 12}}>
      {props.children}
    </Card>
  );
}

class Schedule extends React.Component {

 static navigationOptions = {
    title: 'Schedule'
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

      <KeyboardAwareScrollView style={styles.stripeCollection}>
        <Stripe style={styles.stripeCollection}>
          <Bounds>

            <Section style={styles.sectionTable}>
              <Chunk>
                <TextInput placeholder="Event title" style={[styles.input, styles.inputBig]}  />
              </Chunk>
            </Section>

            <Section style={styles.sectionTable}>
              <Chunk>
                <TextInput placeholder="What date?" style={[styles.input]} />
              </Chunk>
              <Chunk>
                <TextInput placeholder="What time?" style={[styles.input]} />
              </Chunk>
            </Section>
            <Section style={styles.sectionTableFooter}>
              <List
                variant='hscroll'
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
                hscrollItemStyle={{width: 100, paddingLeft: 8}}
                renderItem={(item, i)=>{
                  return(
                    <Option>
                      <Text style={[styles.text, styles.textSmall]}>{item}</Text>
                    </Option>
                  );
                }}
                />
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Most Kids Clothing Swap Meetups happen Weekdays around 10:00am</Text>
              </Chunk>
            </Section>

            <Section style={styles.sectionTable}>
              <Chunk>
                <TextInput placeholder="How long will it be?" style={[styles.input]} />
              </Chunk>
            </Section>
            <Section style={styles.sectionTableFooter}>
              <List
                variant='hscroll'
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
                hscrollItemStyle={{width: 100, paddingLeft: 16}}
                renderItem={(item, i)=>{
                  return(
                    <Option>
                      <Text style={[styles.text, styles.textSmall]}>{item}</Text>
                    </Option>
                  );
                }}
                />
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Most Kids Clothing Swap Meetups happen last 2 hours</Text>
              </Chunk>
            </Section>

            <Section style={styles.sectionTable}>
              <Chunk>
                <TextInput placeholder="Where?" style={[styles.input]} />
              </Chunk>
            </Section>
            <Section style={styles.sectionTableFooter}>
              <List
                variant='hscroll'
                items={['idea 1', 'idea 2', 'idea 3', 'idea 4']}
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
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Most Kids Clothing Swap Meetups happen at library meeting rooms, parks, homes</Text>
              </Chunk>
            </Section>

            <Section style={styles.sectionTable}>
              <Chunk>
                <TextInput
                  placeholder="Event description"
                  multiline
                  style={[styles.input]}
                  />
              </Chunk>
            </Section>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textSmall, styles.textSecondary]}>Share what you’ll do, what members should bring, and other important details they should know.</Text>
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