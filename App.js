import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import SignUpScreen from './screens/SignUpScreen.js';
import Dashboard from './screens/Dashboard.js';

const loginImage = require('./assets/profile.jpg');
const Stack = createStackNavigator();
let loginAPI = "http://172.69.69.105/expologin/verify.php";


// collect username and password user input values & compare with api
function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    let Data = {
      username: username,
      password: password
    };

    fetch(loginAPI, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson && responseJson[0].Message === "Login successful") {
        Alert.alert('Success', responseJson[0].Message);
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Error', responseJson[0].Message);
      }
    })
    .catch((error) => {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error("Error:", error);
    });
  };


//front end can suck my nuts
  return (
    <View style={styles.container}>
      <Image source={loginImage} style={styles.image} />
      
      <Text style={styles.text}>Login :D</Text>

      <Text style={styles.credentials}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.credentials}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.signInButton}
        onPress={login}
      >
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>Don't have an account?</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.signUpButton}>Sign up here!</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

// basically the button navigation 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 58,
  },

  image: {
    width: 320,
    height: 240,
    borderRadius: 5,
    marginBottom: 20,
  },

  text: {
    fontSize: 30,
    marginBottom: 20,
  },

  credentials: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: '#f9f9f9',
  },

  signInButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },

  signInButtonText: {
    color: 'white',
    fontSize: 18,
  },

  signUpText: {
    fontSize: 18,
    marginBottom: 10,
  },

  signUpButton: {
    color: 'blue',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
