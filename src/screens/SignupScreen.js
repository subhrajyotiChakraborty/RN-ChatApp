import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import Input from '../components/Input';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async () => {
    try {
      setIsLoading(true);
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(response.user.uid);
      storeUserData(response);
      setIsLoading(false);
      navigation.navigate('Chat');
    } catch (error) {
      showAlert(error.message);
      setIsLoading(false);
      console.log(error);
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
    backgroundColor: '#edffea',
  },
  registerBtnContainer: {
    padding: 10,
  },
  registerBtn: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
