import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import Input from "../components/Input";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      console.log(response.user.uid);
      storeUserData(response);
      navigation.navigate("Chat"); 
    } catch (error) {
      console.log(error);
    }
  }

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
      <View style={styles.registerBtnContainer}>
        <TouchableOpacity onPress={() => register()}>
          <View>
            <Text style={styles.registerBtn}>Register</Text>
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
    backgroundColor: "#edffea",
  },
  registerBtnContainer: {
    padding: 10,
  },
  registerBtn: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SignupScreen;
