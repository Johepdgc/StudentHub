import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ip = '192.168.1.25';

const ProfileScreen = () => {
    const [user, setUser] = useState("");
    const navigation = useNavigation()
    const { userId, setUserId } = useContext(UserType);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `http://${ip}:3000/profile/${userId}`
                );
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchProfile();
    });

    const logout = () => {
        clearAuthToken();
    }
    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("Cleared auth token");
        navigation.replace("Login")
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.username}>{user?.username}</Text>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Threads.net</Text>
                </View>
            </View>

            <View style={styles.profileInfo}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                    }}
                />
                <View style={styles.bio}>
                    <Text style={styles.bioText}>BTech.</Text>
                    <Text style={styles.bioText}>Movie Buff | Musical Nerd</Text>
                    <Text style={styles.bioText}>Love Yourself</Text>
                </View>
            </View>

            <Text style={styles.followers}>{user?.friends?.length} followers</Text>

            <View style={styles.buttonsContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </Pressable>

                <Pressable onPress={logout} style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D203C',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        color: 'white',
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        backgroundColor: "#D0D0D0",
        marginLeft: 10,
    },
    tagText: {
        color: '#0D203C',
        fontWeight: 'bold',
    },
    profileInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    bio: {
        flex: 1,
    },
    bioText: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
    },
    followers: {
        color: "gray",
        fontSize: 16,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderWidth: 0,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#F2C94C',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});