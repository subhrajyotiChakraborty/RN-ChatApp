import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const Input = ({ placeholder, value, onChange, isPassword = false }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChange}
        value={value}
        secureTextEntry={isPassword}
        style={styles.inputStyle}
        placeholder={placeholder}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 50,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 15,  
    backgroundColor: "#fff",
  },
  inputStyle: {
    textAlign: "center",
    fontSize: 24,
  },
});

export default Input;
