import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "../RecepieBoxStyles.style";

export const IngredientCell = ({ recepieItem }) => {
  // TODO: Create and return the MovieCell component.
  // HINT: Take a look at the movieCell styles, as well as the video
  // demo in the spec, to figure out what this should look like.
  return (
    <View style = {styles.movieCell}>
      <Image style = {styles.movieCellImage} source = {{ uri: recepieItem?.imageURL }}></Image>
      <Text style = {styles.movieCellTitle} textAlignVertical="center">   {recepieItem.name}</Text>
    </View>
  );
};
