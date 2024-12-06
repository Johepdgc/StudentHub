import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Pressable, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import Constants from 'expo-constants';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { UserType } from "../UserContext";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ip = '192.168.1.29';

export default function Post() {
    const navigation = useNavigation();
    const { userId, setUserId } = useContext(UserType);
    const [content, setContent] = useState("");
    const handlePostSubmit = () => {
        const postData = {
            userId,
        };

        if (content) {
            postData.content = content;
        }

        axios
            .post(`http://${ip}:3000/create-post`, postData)
            .then((response) => {
                setContent("");
                Alert.alert("Post creado", "Tu post ha sido creado exitosamente");
                navigation.goBack();
            })
            .catch((error) => {
                console.log("error creating post", error);
            });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faXmark} size={32} color='white' />
                </TouchableOpacity>
                <Pressable style={styles.button} onPress={handlePostSubmit}>
                    <Text style={{ fontWeight: "500" }}>{'Publicar'}</Text>
                </Pressable>
            </View>

            <View style={styles.inputContainer}>
                <Image source={require('../assets/logo.png')} style={styles.avatar} />
                <TextInput
                    style={[styles.textInput, { height: 100 }]}
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    multiline={true}
                    placeholder="¿Qué estás pensando?"
                    placeholderTextColor={'#D8D9DB'}
                />
            </View>

            {/* <TouchableOpacity style={styles.photo} onPress={pickImage}>
                <FontAwesomeIcon icon={faCameraRetro} size={32} color='white' />
            </TouchableOpacity>

            {image && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image.uri }} style={styles.image} />
                </View>
            )} */}
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#0D203C',
        color: 'white',
    },
    textInput: {
        flex: 1,
        height: 50,
        color: 'white',
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 25,
        marginRight: 16,
    },
    photo: {
        alignItems: 'flex-end',
        marginHorizontal: 32,
    },
    imagen: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginHorizontal: 32,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#F2C94C',
        width: 100,
        height: 40,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});
