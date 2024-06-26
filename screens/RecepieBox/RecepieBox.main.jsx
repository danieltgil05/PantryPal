import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
//import { getAllActors } from "../../constants/Constants";
import { IngredientCell } from "./components/IngredientCell";
import { styles } from "./RecepieBoxStyles.style";

// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/recepies.json");

// Output: a screen containing the list of movies
export default function RecepieBox({ navigation, route }) {
  const [search, setSearch] = useState("");
  const [actors, setActors] = useState([]);


  // TODO: Fill out the methods below.
  const selectedRecepie = (recepieItem) => {
    // console.log(movieItem.title);
    return (
    <TouchableOpacity
      onPress={()=> navigation.navigate('Recipe', { item: recepieItem })}>
      <IngredientCell recepieItem = {recepieItem}>
      </IngredientCell>
    </TouchableOpacity>);
  };

  useEffect(
    () => {
      // TODO: Add a "Filter" button to the right bar button.
      // It should lead to the MovieFilterScreen, and pass the "actors" state
      // variable as a parameter.
      navigation.setOptions({
        headerRight: () => (
          <Button 
            title= "Filter"
            onPress={() => navigation.navigate('Filter Movies', { actorArray: actors })}
          />
        )
      });
    },
    [route]
  );

  useEffect(
    () => {
      /* TODO: Recieve the updated list of actors from the filter screen here. 
          See https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen
          for an example of how to send data BACKWARDS in the navigation stack.
      */
      if (route.params?.updatedActors) {
        const updatedActors = route.params.updatedActors;
        console.log("The actors passed in are: ");
        console.log(route.params);
        setActors(updatedActors)
        console.log("Updated Actors for filtering");
      }  
    },
    [route.params?.updatedActors]
  );

  // Renders a row of the FlatList.
  const renderItem = ({ item }) => {
  //   const overlapFound = (listA, listB) => {
  //     let foundActor = false;
  //     listA.forEach((x) => {
  //       if (listB.includes(x)) {
  //         foundActor = true;
  //       }
  //     });
  //     return foundActor;
  //   };

    // TODO: Set up search & filter criteria.
    let meetsSearchCriteria = true;

    if (search) {
      const currSearch = search.toLowerCase();
      const currName = item.name.toLowerCase();
      if (!currName.includes(currSearch)) {
        meetsSearchCriteria = false;
      }
    }
    // console.log(item.actors)
    // console.log(actors)
  //   if (route.params != undefined) {
  //     if (!overlapFound(actors, item.actors)) {
  //       meetsActorsCriteria = false;
  //     }
  //  }

    if (meetsSearchCriteria) {
      // TODO: Return a MovieCell, wrapped by a TouchableOpacity so we can handle taps.
      return selectedRecepie(item);
    } else {
      // If the item doesn't meet search/filter criteria, then we can
      // simply return null and it won't be rendered in the list!
      return null;
    }
  };

  // Our final view consists of a search bar and flat list, wrapped in
  // a SafeAreaView to support iOS.
  return <SafeAreaView>
      {/* TODO: Add a SearchBar: https://reactnativeelements.com/docs/searchbar/.
                The third-party package should already be installed for you. */}
      <SearchBar
        placeholder = "I'm looking for..."
        onChangeText = {text => setSearch(text)}
        value = {search}
      />
      <FlatList
        data = {TABLE_DATA}
        renderItem = {renderItem}
        keyExtractor= {item => item.id}
      />
    </SafeAreaView>;
}
