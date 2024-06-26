import React, {useState, useEffect} from 'react';
import { Image, Pressable, Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { isRecipeAlreadyFavorited } from '../calls/favoriteCalls';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../calls/favoriteCalls';
import { getRecipeDirections } from '../calls/recipeSearchCalls';
import { appBackgroundColor } from "../calls/colorConstants";

export default function IndividualRecipeScreen({ route, navigation }) {

    const { individualRecipe } = route.params;

    const [isFavorited, setIsFavorited] = useState(false);
    const [directionsOfRecipe, setDirectionsOfRecipe] = useState('Loading...');

    useEffect(() => { 
      async function getFavoriteStatusForLoad() {
        try{
          const isThisAlreadyFavorited = await isRecipeAlreadyFavorited(individualRecipe);
          setIsFavorited(isThisAlreadyFavorited);
        } catch (error){
          console.error('Error fetching favs: ', error);
        }
      }
      async function getRecipeDirectionsOnLoad() {
        try{
          const recipeDirections = await getRecipeDirections(individualRecipe.source, individualRecipe.sourceURL);
          setDirectionsOfRecipe(recipeDirections);
        } catch (error){
          console.error('Error fetching directions: ', error);
        }
      }
      getFavoriteStatusForLoad();
      getRecipeDirectionsOnLoad();
    }, []);


    return (
        <SafeAreaView style={IndividualRecipeStyles.container}>
        <ScrollView>
            <View style={IndividualRecipeStyles.singleRecipeDiv}>
            <Text style={IndividualRecipeStyles.foodTitle}>
                {individualRecipe.name}
            </Text>
            <Image 
                source={ { uri: individualRecipe.image}} 
                style={IndividualRecipeStyles.images} 
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {!isFavorited && <Pressable onPress={() => addRecipeToFavorites(individualRecipe, setIsFavorited, directionsOfRecipe, true)}>
                  <Image style={IndividualRecipeStyles.favImage}
                    source={require('../assets/unfav-heart.png')}
                  />
              </Pressable>}
              {isFavorited && <View>
                <Pressable onPress={() => removeRecipeFromFavorites(individualRecipe, setIsFavorited, true)}>
                  <Image style={IndividualRecipeStyles.favImage}
                    source={require('../assets/fav-heart.png')}
                  />
              </Pressable>
              </View>}
              <Text style={IndividualRecipeStyles.calories}>
                  Calories:{'\n'}{individualRecipe.calories}
              </Text>
            </View>
            <View style={IndividualRecipeStyles.divider}/>
            <Text style={IndividualRecipeStyles.ingredientsHeader}>
              Ingredients:
            </Text>
            <Text style={IndividualRecipeStyles.ingredients}>
              {individualRecipe.ingredients}
            </Text>
            <View style={IndividualRecipeStyles.divider}/>
            <Text style={IndividualRecipeStyles.directionsHeader}>
              Directions:
            </Text>
            <Text style={IndividualRecipeStyles.directions}>
              {directionsOfRecipe}
            </Text>
            </View>   
      </ScrollView>
      </SafeAreaView>
    );
  }
  const IndividualRecipeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appBackgroundColor,
      alignItems: 'center',
      justifyContent: 'top',
      height: 'max'
    },
    searchArea:{
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
      marginVertical: 15
    },
    images: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
      alignContent: "center",
      alignItems: "center",
      marginVertical: 5,
    },
    favImage: {
      width: 75,
      height: 75,
      resizeMode: 'contain',
      alignContent: "center",
      alignItems: "center",
    },
    currentlyFavorited: {
      alignContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: '#3cb04c',
      fontSize: 35,
      fontWeight: 600,
      marginTop: 3
    },
    foodTitle: {
      fontSize: 38,
      width: 375,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 5,
      textAlign: 'center'
    },
    calories: {
      fontSize: 28,
      fontWeight: '400',
      width: 150,
      marginTop: 10,
      marginLeft: 20,
      marginRight: -15,
      marginBottom: 10,
      textAlign: 'center',
      alignContent: "center",
      alignItems: "center",
    },
    ingredientsHeader: {
      fontSize: 28,
      fontWeight: '400',
      width: 220,
      marginTop: 5,
      marginBottom: 5,
      textAlign: 'center',
      alignContent: "center",
      alignItems: "center",
    },
    ingredients: {
      fontSize: 22,
      fontWeight: '300',
      width: 330,
      marginBottom: 5,
      textAlign: 'center',
      alignContent: "center",
      alignItems: "center",
    },
    directionsHeader: {
      fontSize: 28,
      fontWeight: '400',
      width: 220,
      marginTop: 5,
      marginBottom: 5,
      textAlign: 'center',
      alignContent: "center",
      alignItems: "center",
    },
    directions: {
      fontSize: 22,
      fontWeight: '300',
      width: 370,
      marginBottom: 5,
      textAlign: 'center',
      alignContent: "center",
      alignItems: "center",
    },
    singleRecipeDiv: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    divider: {
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: 350,
      marginVertical: 10,
      alignContent: "center",
      alignItems: "center",
    },
    textResults: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      width: 200,
      marginLeft: 15
    }
  }
);