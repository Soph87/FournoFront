console.disableYellowBox = true;
import React from 'react';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator, TransitionSpecs, CardStyleInterpolators, TransitionPresets} from 'react-navigation-stack';

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
import RecetteModif from './screens/rechercher-recette/components/modifier-recette';//Je suis pas sûre qu'on ait besoin de cet écran
//Screens ajout de recette
import AjoutCategorie from './screens/ajouter-recette/ajout-categories';
import ListeCategories from './screens/rechercher-recette/categories'
import TitreRecette from './screens/ajouter-recette/ajout-titre';
import PrepaRecette from './screens/ajouter-recette/ajout-preparation';
import Ingredients from './screens/ajouter-recette/ajout-ingredients';
import Etapes from './screens/ajouter-recette/ajout-etapes';
import Photo from './screens/ajouter-recette/ajout-photo';
import Recap from './screens/ajouter-recette/recapitulatif';
import RecapManuel from './screens/ajouter-recette/recapManuel';
import AjoutURL from './screens/ajouter-recette/ajout-url';
import ListeRecherche from './screens/listeRecherche'
import MonCompte from './screens/compte'
import GestionCat from './screens/gestionCat'
//Redux
import prenom from './reducers/prenom';
import category from './reducers/category';
import recette from './reducers/recette';
import photo from './reducers/photo'
import searchText from './reducers/search'
import newRecette from './reducers/marmiton.reducer';
import recetteAjout from './reducers/recette-ajout.reducer';
import categoryPref from './reducers/categoryPref'
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import token from './reducers/token'
import { useFonts } from '@use-expo/font';
import { AppLoading } from "expo";
import { Easing } from 'react-native-reanimated';

const store = createStore(combineReducers({prenom, category, recette, photo, searchText, newRecette, token, recetteAjout, categoryPref}))

var StackNavigator = createStackNavigator({
    Home: SignIn,
    SignUp: SignUp,
    Menu: Menu,
    Accueil: Accueil,
    AjoutURL: AjoutURL,
    ListeCategories: ListeCategories,
    ListePlats: ListePlats,
    Recette: Recette,
    AjoutCategorie: AjoutCategorie,
    Titre: TitreRecette,
    Preparation: PrepaRecette,
    Ingredients: Ingredients,
    Etapes: Etapes,
    Photo: Photo,
    Recap: Recap,
    ListeRecherche: ListeRecherche,
    RecapManuel: RecapManuel,
    MonCompte: MonCompte,
    GestionCat: GestionCat
}, 
{
  headerMode: "none",
  gestureEnabled: true,
  gestureDirection: 'horizontal',
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

