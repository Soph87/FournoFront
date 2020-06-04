import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Accueil from './screens/accueil';


var StackNavigator = createStackNavigator({
  Home: SignIn,
  SignUp: SignUp,
  Accueil: Accueil
}, 
{
  headerMode: "none"
});



const Navigation = createAppContainer(StackNavigator);

export default function App() {
  return (
    <Navigation />

  )
}