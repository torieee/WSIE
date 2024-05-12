import React, {useState} from 'react';
import { Image, Pressable, Text, View, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { isRecipeAlreadyFavorited } from '../calls/favoriteCalls';
import { addRecipeToFavorites, removeRecipeFromFavorites } from '../calls/favoriteCalls';

export default function IndividualRecipeScreen({ route, navigation }) {

    // const [isFavorited, setIsFavorited] = useState(isRecipeAlreadyFavorited(route.params));
    const [isFavorited, setIsFavorited] = useState(false);

    const { individualRecipe } = route.params;

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
            {!isFavorited && <Pressable style={IndividualRecipeStyles.favoritesButton} onPress={() => addRecipeToFavorites(individualRecipe, setIsFavorited, true)}>
                <Text style={IndividualRecipeStyles.buttonText}>
                    Add to favorites
                </Text>
            </Pressable>}
            {isFavorited && <View>
            <Text style={IndividualRecipeStyles.currentlyFavorited}>
              --- Favorited ---
              </Text>
              <Pressable style={IndividualRecipeStyles.unfavoritesButton} onPress={() => removeRecipeFromFavorites(individualRecipe, setIsFavorited, true)}>
                <Text style={IndividualRecipeStyles.buttonText}>
                    Remove favorite
                </Text>
            </Pressable>
            </View>}
            
            <Text style={IndividualRecipeStyles.calories}>
                Calories: {individualRecipe.calories}
            </Text>
            </View>   
      </ScrollView>
      </SafeAreaView>
    );
  }
  const IndividualRecipeStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffd5ad',
      alignItems: 'center',
      justifyContent: 'top',
      height: 'max'
    },
    favoritesButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        width: 250,
        height: 75,
        margin: 10,
        marginTop: 20,   
        backgroundColor: '#3cb04c' 
    },
    unfavoritesButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        width: 250,
        height: 75,
        margin: 10,
        marginTop: 20,   
        backgroundColor: 'red' 
    },
    buttonText:{
        fontSize: 30,
        fontWeight: '600',
        color: '#ffffff'
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
    },
    currentlyFavorited: {
      alignContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: '#3cb04c',
      fontSize: 35,
      fontWeight: 600,
      marginTop: 10
    },
    foodTitle: {
      fontSize: 40,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center'
    },
    calories: {
      fontSize: 28,
      fontWeight: '400',
      width: 220,
      marginTop: 5,
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