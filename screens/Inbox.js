import { StyleSheet, Text, View, ScrollView, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import User from '../components/User';

const ip = "192.168.1.29";

const Inbox = () => {
    const [selectedButton, setSelectedButton] = useState('people');
    const [content, setContent] = useState('People Content');
    const [users, setUsers] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
    };
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken');
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                setUserId(userId);

                const response = await axios.get(`http://${ip}:3000/user/${userId}`);
                console.log("API response:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.log("error buscando usuarios", error);
            }
        };

        fetchUsers();
    }, []);
    console.log("users", users);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.headText}>Inbox</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => handleButtonClick("people")}
                            style={[
                                {
                                    flex: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: '#F2C94C',
                                    borderColor: '#F2C94C',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                },
                                selectedButton === 'people' ? { backgroundColor: 'black' } : null,
                            ]}
                        >
                            <Text style={[
                                { textAlign: 'center', fontWeight: 'bold' },
                                selectedButton === 'people'
                                    ? { color: 'white' }
                                    : { color: 'black' },
                            ]}
                            >
                                People
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleButtonClick("todo")}
                            style={[
                                {
                                    flex: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: '#F2C94C',
                                    borderColor: '#F2C94C',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                },
                                selectedButton === 'todo' ? { backgroundColor: 'black' } : null,
                            ]}
                        >
                            <Text style={[
                                { textAlign: 'center', fontWeight: 'bold' },
                                selectedButton === 'todo'
                                    ? { color: 'white' }
                                    : { color: 'black' },
                            ]}
                            >
                                Todo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleButtonClick("solicitudes")}
                            style={[
                                {
                                    flex: 1,
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    backgroundColor: '#F2C94C',
                                    borderColor: '#F2C94C',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                },
                                selectedButton === 'solicitudes' ? { backgroundColor: 'black' } : null,
                            ]}
                        >
                            <Text style={[
                                { textAlign: 'center', fontWeight: 'bold' },
                                selectedButton === 'solicitudes'
                                    ? { color: 'white' }
                                    : { color: 'black' },
                            ]}
                            >
                                Solicitudes
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {selectedButton === "people" && (
                            <View style={{ marginTop: 20 }}>
                                {users?.map((item, index) => (
                                    <User key={item.id ? item.id.toString() : index.toString()} item={item} />
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Inbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        padding: 10,
        backgroundColor: '#0D203C',
    },
    contentContainer: {
        backgroundColor: '#0D203C',
        padding: 20,
    },
    headText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        padding: 10,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
})