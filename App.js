import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Catalog from './Catalog';


export default class App extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Catalog />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
