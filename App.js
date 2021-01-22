import React from 'react';
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './store'
import Home from './screens/home'
import Game from './screens/game'
import Finish from './screens/finish'

export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
            <Stack.Screen name="Game" component={Game} options={{headerShown:false}}/>
            <Stack.Screen name="Finish" component={Finish} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
