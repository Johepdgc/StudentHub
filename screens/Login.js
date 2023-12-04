import React, { useEffect } from 'react';
import { View, TextInput, Pressable, StyleSheet, Text, Image, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                if(token){
                    navigation.replace('Home');
                } else {
                // token no existe
                }
            } catch (error) {
                console.log('Error', error);
            }
        };

        checkLogin();
    }, []);

    const handleLogin = () => {
        const user = {
            email: email,
            password:password,
        }

        axios.post('http://localhost:3000/Login', user).then((response) => {
            console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem('authToken', token);
            
            navigation.replace('Home');
        }).catch((err) => {
            Alert.alert('Error', 'Correo o contraseña incorrecta');
            console.log('Error de ingreso', err);
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.loginContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Pressable style={styles.button} on onPress={handleLogin}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
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
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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

export default Login;