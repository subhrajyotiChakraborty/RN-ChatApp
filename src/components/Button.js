import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = ({ clicked, enableBgColor = false, title }) => {
    return (
        <TouchableOpacity onPress={clicked} style={styles.btnContainer}>
            <View style={enableBgColor ? styles.btnWithBg : styles.btnDefaultBg}>
            <Text style={enableBgColor ? styles.btnTextWithBgColor : styles.btnText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        marginTop: 5,
    },
    btnDefaultBg: {
        backgroundColor: "#edffea",
        padding: 10
    },
    btnText: {
        color: "black",
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    btnWithBg: {
        backgroundColor: "#75daad",
        padding: 10
    },
    btnTextWithBgColor: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    }
});

export default Button;