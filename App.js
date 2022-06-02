import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const WEATHER_API_KEY = "5dab8f9388bca535acf0e30a76325173";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

export default function App() {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [currentWeather, setCurrentWeather] = React.useState(null);

  Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
    maximumAge: 10000,
    timeout: 5000,
  })
    .then((res) => setLocation(res))
    .catch((e) => console.log(e));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const weatherUrl = `${WEATHER_BASE_URL}lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${WEATHER_API_KEY}`;
      const response = await fetch(weatherUrl);
      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMsg(result.message);
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.latitude);
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
