import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import styles from "../../assets/styles/login.styles.js";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {}
  return (
    <View style={styles.container}>
      {/*ILUSTRATION*/}
      <View style={styles.topIllustration}>
        <Image 
          source={require("../../assets/images/book-i.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>
      <Text>Login Screen</Text>
    </View>
  )
}