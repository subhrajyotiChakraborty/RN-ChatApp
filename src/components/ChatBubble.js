import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import UserAvatar from 'react-native-user-avatar';
import AsyncStorage from '@react-native-community/async-storage';

const ChatBubble = ({message, sender, isUser}) => {

  return (
    <View style={styles.container}>
      {!isUser ? <UserAvatar name={sender} size={30} style={styles.avatar} /> : null}
      <Text style={isUser ? styles.chatTextDefault : styles.chatTextOther}>
        {message}
      </Text>
      {isUser ? <UserAvatar name="Me" size={30} style={styles.avatar} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  chatTextDefault: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#216353',
    color: 'white',
    fontSize: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  chatTextOther: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#75daad',
    color: 'black',
    fontSize: 16,
    overflow: 'hidden',
  },
});

export default ChatBubble;
