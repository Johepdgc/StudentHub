import React, { useState } from "react";
import { View, TextInput, Button, Pressable, StyleSheet, Text, Picker, Image, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Register() {
    const [checked, setChecked] = React.useState('first');

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.imageContainer}>
                <Image
                  style={styles.logo}
                  source={require('./assets/logo.png')}
                />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Username"
            // Add the logic to handle username input
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            // Add the logic to handle email input
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            // Add the logic to handle password input
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            // Add the logic to handle password confirmation input
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            // Add the logic to handle date of birth input
          />
          <Text>Gender</Text>
          <View>
            <RadioButton
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
            />
            <RadioButton
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            />
            </View>
          <TextInput
            style={styles.input}
            placeholder="College"
            // Add the logic to handle college input
          />
          <TextInput
        style={styles.input}
        placeholder="Major"
        // Add the logic to handle major input
      />
      <TextInput
        style={styles.input}
        placeholder="Group"
        // Add the logic to handle group input
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        // Add the logic to handle year input
      />
      <Pressable style={styles.button} on onPress={() => (navigator.navigate('CreatePost'))}>
        <Text style={styles.buttonText}>Registarse</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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