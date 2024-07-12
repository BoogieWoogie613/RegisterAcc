// SignUpScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // The actual backend logic shit 
  const validateAndSignUp = () => {
    if (!username || !password || password !== confirmPassword) {
      let errorMessage = '';
      if (!username) {
        errorMessage = 'Username is required';
      } else if (!password) {
        errorMessage = 'Password is required';
      } else if (password !== confirmPassword) {
        errorMessage = 'Passwords do not match';
      }
      Alert.alert('Error', errorMessage);
      return;
      } 
    else {
      let InsertAPIURL = "http://172.69.69.105/expologin/insert.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        username: username,
        password: password
      };

      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((response) => response.json())
      .then((response) => {
        alert(response[0].Message);
      })
      .catch((error) => {
        alert("Error" + error);
      });
    }
  };

  // Frontend shit below
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>

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

      <Text style={styles.credentials}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#888"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title="Sign Up"
        onPress={validateAndSignUp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});
