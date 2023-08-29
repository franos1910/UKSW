import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {AppNavigator} from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </View>
  );
};

export default App;
