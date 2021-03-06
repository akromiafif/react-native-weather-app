import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const WeatherInfo = ({ currentWeather }) => {
  const {
    main: { temp },
    weather: [details],
  } = currentWeather;

  const { icon } = details;
  const { iconUrl } = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.weatherInfo}>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text>{temp}</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  weatherInfo: {
    alginItems: "center",
  },

  weatherIcon: {
    width: "100px",
    height: "100px",
  },
});
