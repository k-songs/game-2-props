import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

function PrimaryButton(props) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={props.pressHandler}
        android_ripple={{ color: "#640233" }}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonContainer, styles.pressed]
            : styles.buttonContainer
        }
      >
        <Text style={styles.buttonText}>{props.children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonContainer: {
    backgroundColor: "#72063c",
    paddingHorizontal: 16,
    paddingVertical: 8,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
