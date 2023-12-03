import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
            </View>
            <SafeAreaView style={styles.loginContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    value='email'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType='password'
                    value='password'
                    onChangeText={(text) => setPassword(text)}
                />
                <Pressable style={styles.button} on onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </Pressable>
            </SafeAreaView>
        </View>
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