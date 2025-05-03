import { View, Text, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/styles/signup.styles.js'
import COLORS from '../../constants/colors.js'
import { Ionicons } from "@expo/vector-icons";


export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  return (
    <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
            <View style={styles.card}>
                {/* HEADER */}
                <View style={styles.header}>
                  <Text style={styles.title}>BookWorm</Text>
                  <Text style={styles.subtitle}>Share Your favourite reads</Text>
                </View>

                {/* FORM INPUT */}
                <View style={styles.formContainer}>
                  {/* USERNAME*/}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Username</Text>
                    <View style={styles.inputContainer}>
                      <Ionicons 
                        name="person-outline"
                        size={20}
                        color={COLORS.primary}
                        style={styles.inputIcon}
                      />
                      <TextInput 
                        style={styles.input}
                        placeholder="King kenenisa"
                        placeholderTextColor={COLORS.placeholderText}
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize='none'
                      />
                    </View>
                  </View>
                </View>
            </View>
        </View>
    </KeyboardAvoidingView>
  )
}