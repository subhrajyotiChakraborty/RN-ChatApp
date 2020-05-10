import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import Input from "../components/Input";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = async() => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response.user);
      storeUserData(response);
      navigation.navigate("Chat")
    } catch (error) {
      console.log(error);
    }
  };

  const storeUserData = async ({ user }) => {
    try {
      await AsyncStorage.setItem("USER_DATA", JSON.stringify(user));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder="Email"
          value={email}
          onChange={(email) => setEmail(email)}
        />
        <Input
          isPassword
          placeholder="Password"
          value={password}
          onChange={(password) => setPassword(password)}
        />
      </View>
      <View style={styles.loginBtnContainer}>
        <TouchableOpacity onPress={() => logIn()}>
          <View>
            <Text style={styles.loginBtn}>Log In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#75daad",
  },
  loginBtnContainer: {
    padding: 10,
  },
  loginBtn: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  },
});

export default LoginScreen;
