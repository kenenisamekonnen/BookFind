import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container} >
      <Text style={styles.title}>Welcome to BookFd</Text>
      <Link href="/(auth)"> Login Page </Link>
      <Link href="/(auth)/signup"> Signup Page </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    color: "dark",
    width: 250
  }
})
