/* eslint-disable */
import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home.tsx';
import {enableScreens} from 'react-native-screens';
import {SafeAreaView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/types/RootStackParamList.ts';
import AddTask from './src/subscreens/home/AddTask.tsx';

enableScreens();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.darker,
        padding: 20,
        flex: 1,
      }}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerBackTitle: 'Back', headerShown: false}}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTask}
            options={{headerBackTitle: 'Back', headerShown: false}}
          />
          {/* Define other screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
