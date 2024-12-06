import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from "react";
import { UserType } from "../UserContext";

const ip = '192.168.1.29';

const User = ({ item }) => {
    const { userId } = useContext(UserType);
    console.log("sds", item, userId);
    const [requestSent, setRequestSent] = useState(false);
    const sendFollow = async (currentUserId, selectedUserId) => {
        try {
            const response = await fetch(`http://${ip}:3000/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentUserId, selectedUserId }),
            });

            if (response.ok) {
                setRequestSent(true);
            }
        } catch (error) {
            console.log("error message", error);
        }
    };

    const handleUnfollow = async (targetId) => {
        try {
            const response = await fetch(`http://${ip}:3000/users/unfollow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loggedInUserId: userId,
                    targetUserId: targetId,
                }),
            });

            if (response.ok) {
                setRequestSent(false);
                console.log("unfollowed successfully")
            }
        } catch (error) {
            console.log("Error", error);
        }
    };
    useEffect(() => {
        // Reset the requestSent state whenever the userId or item prop changes
        setRequestSent(false);
    }, [userId, item]);
    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 15, }}>
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        resizeMode: "contain",
                    }}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
                    }}
                />

                <Text style={{ fontSize: 15, flex: 1, color: "white", fontWeight: "bold" }}>
                    {item?.username}
                </Text>

                {requestSent || item?.friends?.includes(userId) ? (
                    <Pressable
                        onPress={() => handleUnfollow(item?._id)}
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderWidth: 1,
                            padding: 10,
                            marginLeft: 10,
                            width: 100,
                            borderRadius: 8,
                        }}
                    >
                        <Text
                            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
                        >
                            Following
                        </Text>
                    </Pressable>
                ) : (
                    <Pressable
                        onPress={() => sendFollow(userId, item._id)}
                        style={{
                            backgroundColor: "#F2C94C",
                            padding: 10,
                            marginLeft: 10,
                            width: 100,
                            borderRadius: 10,
                        }}
                    >
                        <Text
                            style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}
                        >
                            Follow
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};
User.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        friends: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
};

export default User;

const styles = StyleSheet.create({});