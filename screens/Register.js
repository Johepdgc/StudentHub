import React, { useState } from "react";
import { View, StatusBar, TextInput, Pressable, StyleSheet, Text, Picker, Image, ScrollView, SafeAreaView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function Register() {
  const navigation = useNavigation();
  const [value, setValue] = React.useState('first');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [dob, setDob] = React.useState('');
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          onChangeText={(text) => setDob(text)}
        />
        <Text>Genero</Text>
        <View>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <View>
            <Text>Hombre</Text>
            <RadioButton value="Hombre" />
          </View>
          <View>
            <Text>Mujer</Text>
            <RadioButton value="Mujer" />
          </View>
        </RadioButton.Group>
          </View>
          <TextInput
            style={styles.input}
            placeholder="College"
            onChangeText={(text) => setCollege(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Major"
            onChangeText={(text) => setMajor(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Group"
            onChangeText={(text) => setGroup(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Year"
            onChangeText={(text) => setYear(text)}
          />
          <Pressable style={styles.button} on onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Registarse</Text>
          </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: '#0D203C',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#0D203C',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    imageContainer: {
      
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 158,
      height: 134,
      marginBottom: 20,
      marginTop: 20,
    },
    input: {
      height: 50,
      width: 250,
      borderWidth: 1,
      padding: 10,
      borderRadius: 30,
      backgroundColor: 'white',
      textAlign: 'center',
      marginBottom: 10,
      marginTop: 10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 30,
      elevation: 3,
      backgroundColor: '#F2C94C',
      width: 150,
      height: 50,
      marginBottom: 20,
      marginTop: 20,
  },
  buttonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
  },
});