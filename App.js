// imports
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer);

// screens
import Choose from './screens/Choose';
import GroupHome from './screens/GroupHome';
import IdeaDetail from './screens/IdeaDetail';
import Schedule from './screens/Schedule';
import VenueDetail from './screens/VenueDetail';
import CalendarPicker from './screens/CalendarPicker';
import End from './screens/End';

const routeConfig = {
	Choose: { screen: Choose },
	GroupHome: { screen: GroupHome },
	IdeaDetail: { screen: IdeaDetail },
	Schedule: { screen: Schedule },
	End: { screen: End },
}

const navigationOptions = {
  tintColor: 'red',
  headerStyle: {
  	backgroundColor: 'white'
  },
  titleStyle: {
    color: 'black'
  }
};


// navigators
const AppStackNavigator = StackNavigator(routeConfig, navigationOptions);
const AppModalNavigator = StackNavigator({
		AppStackNavigator: { screen: AppStackNavigator },
    VenueDetail: { screen: VenueDetail },
    CalendarPicker: { screen: CalendarPicker }
	}, {
    mode: 'modal',
    headerMode: 'none',
		cardStyle: {
      //paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
});

const App = () => {
  return(
    <Provider store={store}>
      <AppModalNavigator />
    </Provider>
  );
};

export default App;