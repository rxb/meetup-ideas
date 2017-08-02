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


class VenueDetail extends React.Component {
  render() {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <Stripe>
          <Bounds>
            <Section>
              <Chunk>
                <Text style={[styles.text, styles.textPageHead]}>Venue Detail</Text>
              </Chunk>
            </Section>
          </Bounds>
        </Stripe>
      </ScrollView>
    );
  }
}


export default VenueDetail;