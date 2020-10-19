import React, {useLayoutEffect, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import {useHeaderHeight} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import ChatBubble from '../components/ChatBubble';

const ChatScreen = ({navigation}) => {
  const chatContainer = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => logOutView(),
    });
  }, [navigation]);

  useEffect(() => {
    loadMessages();
    getUserData();
    const listener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => {
      listener.remove();
    };
  }, []);
  useEffect(() => {
    chatContainer &&
      chatContainer.current &&
      chatContainer.current.scrollToEnd({
        animated: true,
      });
  }, [messages]);

  const confirmationAlert = () => {
    Alert.alert('Log out', 'Are you sure, you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirm', onPress: () => logOut()},
    ]);
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('USER_DATA');
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('USER_DATA');
      if (value !== null) {
        const loggedInUserData = JSON.parse(value);
        setUserData(loggedInUserData);
      }
    } catch (e) {
      console.log('error');
      setUserData(null);
    }
  };

  const loadMessages = () => {
    try {
      firestore()
        .collection('messages')
        .orderBy('date')
        .onSnapshot(querySnapshot => {
          let msgArr = [];
          querySnapshot.docs.forEach(doc => {
            const data = doc['_data'];
            let obj = {
              sender: data['sender'],
              body: data['body'],
              date: `${data['date']}`,
            };
            msgArr.push(obj);
          });
          console.log(msgArr);
          setMessages(msgArr);
          chatContainer &&
            chatContainer.current &&
            chatContainer.current.scrollToEnd({
              animated: true,
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await firestore()
        .collection('messages')
        .add({
          body: message,
          sender: userData.email,
          date: new Date().getTime(),
        });
      console.log(response);
      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  const logOutView = () => {
    return (
      <TouchableOpacity
        style={styles.logOutBtn}
        onPress={() => confirmationAlert()}>
        <Text style={styles.logOutBtnText}>Log Out</Text>
      </TouchableOpacity>
    );
  };

  const messageView = () => {
    if (userData) {
      return messages.map(({sender, body, date}) => {
        return (
          <ChatBubble
            key={date}
            sender={sender}
            message={body}
            isUser={userData.email === sender}
          />
        );
      });
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : null}
        style={styles.keyBoardContainer}
        keyboardVerticalOffset={headerHeight}>
        <View style={styles.chatContainer}>
          <ScrollView showsVerticalScrollIndicator={false} ref={chatContainer}>
            {messageView()}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={msg => setMessage(msg)}
            multiline={true}
            placeholder="Write a message..."
          />
          <TouchableOpacity
            style={styles.sendIconContainer}
            onPress={() => sendMessage()}>
            <Icon name="send" style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyBoardContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 6,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#216353',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  input: {
    flex: 9,
    padding: 5,
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  sendIconContainer: {
    flex: 1,
    marginLeft: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  sendIcon: {
    fontSize: 30,
    color: 'white',
  },
  logOutBtn: {
    marginRight: 20,
  },
  logOutBtnText: {
    fontSize: 16,
  },
});

export default ChatScreen;
