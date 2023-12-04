import React from "react";
import { View, StatusBar, TextInput, Pressable, StyleSheet, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [selectedValue, setSelectedValue] = React.useState('null');
  const [college, setCollege] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [group, setGroup] = React.useState('');
  const [year, setYear] = React.useState('');
  const navigation = useNavigation();
  
  const handleRegistration = () => {
    if (password !== confirmPassword) {
      // Mostrar error de que las contraseñas no coinciden
      Alert.alert('Error', 'Las contraseña no coinciden');
      return;
    }
    const user = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      dob: dob,
      genero: selectedValue,
      college: college,
      major: major,
      group: group,
      year: year,
    }

    // enviar una solicitud post a la API de backend para registrar al usuario
    axios.post('http://localhost:3000/Register', user).then((response) => {
      console.log(response);
      Alert.alert('Registro exitoso', 'Bienvenido a Student Hub');
      
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setDob('');
      setSelectedValue('');
      setCollege('');
      setMajor('');
      setGroup('');
      setYear('');
    }).catch((err) => {
      Alert.alert('Error al registar', err);
    })
  };

  const CustomRadioButton = ({ label, selected, onSelect }) => ( 
    <TouchableOpacity 
        style={[styles.radioButton, 
        { backgroundColor: selected ? '#F2C94C' : '#FFFFFF' }]} 
        onPress={onSelect} 
    > 
        <Text style={[styles.radioButtonText, 
        { color: selected ? '#FFFFFF' : '#0D203C' }]}> 
            {label} 
        </Text> 
    </TouchableOpacity> 
);
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
        </View>
        <TextInput
        value={username}
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
        value={confirmPassword}
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TextInput
        value={dob}
          style={styles.input}
          placeholder="Date of Birth"
          onChangeText={(text) => setDob(text)}
        />
        <View style={styles.radioButtonContainer}>
          <Text style={styles.text}>
            Genero
          </Text>
          <CustomRadioButton
          value={selectedValue}
            label="Masculino" 
            selected={selectedValue === 'Masculino'} 
            onSelect={() => setSelectedValue('Masculino')} 
          /> 
          <CustomRadioButton 
          value={selectedValue}
            label="Femenino"
            selected={selectedValue === 'Femenino'} 
            onSelect={() => setSelectedValue('Femenino')} 
          /> 
          <CustomRadioButton 
          value={selectedValue}
            label="Otro"
            selected={selectedValue === 'Otro'} 
            onSelect={() => setSelectedValue('Otro')} 
          />
        </View>
          <TextInput 
          value={college}
            style={styles.input}
            placeholder="College"
            onChangeText={(text) => setCollege(text)}
          />
          <TextInput
          value={major}
            style={styles.input}
            placeholder="Major"
            onChangeText={(text) => setMajor(text)}
          />
          <TextInput
          value={group}
            style={styles.input}
            placeholder="Group"
            onChangeText={(text) => setGroup(text)}
          />
          <TextInput
          value={year}
            style={styles.input}
            placeholder="Year"
            onChangeText={(text) => setYear(text)}
          />
          <Pressable style={styles.button} on onPress={handleRegistration}>
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
      backgroundColor: '#0D203C',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    radioButtonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      marginTop: 20,
    },
    radioButton: {
      paddingVertical: 12, 
        paddingHorizontal: 16, 
        borderRadius: 30, 
        marginVertical: 8,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 180,    
    },
    radioButtonText: {
      color: '#0D203C',
      fontSize: 12,
      fontWeight: 'bold',
      marginRight: 10,
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
    text: {
      color: 'white',
      fontSize: 21,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
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

export default Register;