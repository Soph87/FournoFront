console.disableYellowBox = true;
import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Screens users
import SignIn from './screens/users/signin';
import SignUp from './screens/users/signup';
//Screens accueil
import Accueil from './screens/accueil';
import Menu from './screens/menu';
//Screens recherche de recette
import SearchCategorie from './screens/rechercher-recette/categories';
import ListePlats from './screens/rechercher-recette/liste-plats';
import Recette from './screens/rechercher-recette/recette';
import RecetteModif from './screens/rechercher-recette/modifier-recette';//Je suis pas sûre qu'on ait besoin de cet écran
//Screens ajout de recette
import AjoutCategorie from './screens/ajouter-recette/ajout-categories';
import ListeCategories from './screens/rechercher-recette/categories'
import TitreRecette from './screens/ajouter-recette/ajout-titre';
import PrepaRecette from './screens/ajouter-recette/ajout-preparation';
import Ingredients from './screens/ajouter-recette/ajout-ingredients';
import Etapes from './screens/ajouter-recette/ajout-etapes';
import Photo from './screens/ajouter-recette/ajout-photo';
import Recap from './screens/ajouter-recette/recapitulatif';


//Redux
import prenom from './reducers/prenom'
import category from './reducers/category'
import recette from './reducers/recette'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import { useFonts } from '@use-expo/font';
import { AppLoading } from "expo";

const store = createStore(combineReducers({prenom, category, recette}))

var StackNavigator = createStackNavigator({
    Home: SignIn,
    SignUp: SignUp,
    Menu: Menu,
    Accueil: Accueil,
    ListeCategories: ListeCategories,
    ListePlats: ListePlats,
    Recette: Recette,
    AjoutCategorie: AjoutCategorie,
    Titre: TitreRecette,
    Preparation: PrepaRecette,
    Ingredients: Ingredients,
    Etapes: Etapes,
    Photo: Photo,
    Recap: Recap
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