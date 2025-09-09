import React from "react"; // ✅ React desde "react"
import { StyleSheet, View } from "react-native";
import Login from "./Screen/Auth/login"; // ✅ sin llaves porque es export default

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
