import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Input from '../components/Input';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const logIn = async () => {
    try {
      setIsLoading(true);
      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response.user);
      storeUserData(response);
      setIsLoading(false);
      navigation.navigate('Chat');
    } catch (error) {
      console.log(error.message);
      showAlert(error.message);
      setIsLoading(false);
    }
  };

  const storeUserData = async ({user}) => {
    try {
      await AsyncStorage.setItem('USER_DATA', JSON.stringify(user));
    } catch (e) {
      console.log(e);
    }
  };

  const showAlert = message => {
    const msgArray = message.split('] ');
    const title = msgArray && msgArray[0].replace('[', '');
    const body = msgArray && msgArray[1];
    Alert.alert(title, body);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View>
        <Input
          placeholder="Email"
          value={email}
          onChange={email => setEmail(email)}
        />
        <Input
          isPassword
          placeholder="Password"
          value={password}
          onChange={password => setPassword(password)}
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
    backgroundColor: '#75daad',
  },
  loginBtnContainer: {
    padding: 10,
  },
  loginBtn: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoginScreen;
