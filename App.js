console.disableYellowBox = true;
import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Accueil from './screens/accueil';
import ListePlats from './screens/liste-plats';
import prenom from './reducers/prenom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import { useFonts } from '@use-expo/font';
import { AppLoading } from "expo";
import { AsyncStorage } from 'react-native';

const store = createStore(combineReducers({prenom}))

var StackNavigator = createStackNavigator({
    Home: SignIn,
    SignUp: SignUp,
    Accueil: Accueil,
    ListePlats : ListePlats
}, 
{
  headerMode: "none"
});

const Navigation = createAppContainer(StackNavigator);

export default function App() {

  let [fontsLoaded] = useFonts({
    'BarlowCondensed-Regular': require('./assets/fonts/BarlowCondensed-Regular.ttf'),
    'BarlowCondensed-Medium': require('./assets/fonts/BarlowCondensed-Medium.ttf'),
    'BarlowCondensed-SemiBold': require('./assets/fonts/BarlowCondensed-SemiBold.ttf'),
    'BarlowCondensed-Black': require('./assets/fonts/BarlowCondensed-Black.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  

  return (
    <Provider store={store}>
    <Navigation />
    </Provider>
  )
}