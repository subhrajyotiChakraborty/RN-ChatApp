import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Button from "../components/Button";

const LandingScreen = ({ navigation }) => {
    return (
        <View style={styles.containerView}>
            <View style={styles.upperView}>
                <Text style={styles.appTitle}>⚡️FlashChat</Text>
            </View>
            <View style={styles.lowerView}>
                <Button title="Register" clicked={() => navigation.navigate("Signup")} />
                <Button title="Login" enableBgColor clicked={() => navigation.navigate("Login")} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignContent: "space-between"
    },
    upperView: {
        flex: 1,
        alignItems:"center",
        justifyContent: "flex-end"
    },
    lowerView: {
        flex: 1,
        justifyContent: "flex-end"
    },
    appTitle: {
        fontSize: 50,
        fontWeight: "bold"
    }
});

export default LandingScreen;