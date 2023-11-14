import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';

const Login = () => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                // logica para controlar el input de usuario
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                // logica para controlar el input de contraseña
            />
            <Pressable style={styles.button} on onPress={() => {/* logica para validar el usuario y contraseña */ }}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#F2C94C',
        width: 200,
        height: 50,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000000',
    },
});

export default Login;