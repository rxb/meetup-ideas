// imports
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';

// screens
import Choose from './screens/Choose';
import GroupHome from './screens/GroupHome';
import IdeaDetail from './screens/IdeaDetail';
import Schedule from './screens/Schedule';
import VenueDetail from './screens/VenueDetail';
import End from './screens/End';


// navigator
export default App = StackNavigator({
  Choose: { screen: Choose },
  GroupHome: { screen: GroupHome },
  IdeaDetail: { screen: IdeaDetail },
  Schedule: { screen: Schedule },
  VenueDetail: { screen: VenueDetail },
  End: { screen: End },
}, {
  navigationOptions: {
    tintColor: 'red',
    headerStyle: {
    	backgroundColor: 'white'
    },
    titleStyle: {
      color: 'black'
    }
  },
});

