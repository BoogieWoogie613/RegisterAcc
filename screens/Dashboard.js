import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

const loginImage = require('../assets/gorillaz.jpg');

// the open weather api handlers ../..
const api = {
    key: "ca8ce713e31b62647cdc683b9ffd3623",
    base: "https://api.openweathermap.org/data/2.5/"
}

export default function Dashboard({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = () => {
    fetch(`${api.base}weather?q=${searchQuery}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result); // <<-- they couldve taught us this but idk
        setWeather(result);
      });
  };

  return (
    <View style={styles.container}>

    <Image source={loginImage} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      
      {weather && weather.name && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weather.name}</Text>
          <Text style={styles.weatherDetails}>Temperature: {weather.main.temp}°C</Text>
          <Text style={styles.weatherDetails}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.weatherDetails}>Conditions: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  image: {
    width: 320,
    height: 240,
    borderRadius: 5,
    marginBottom: 20,
  },


  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weatherDetails: {
    fontSize: 18,
  },
});
