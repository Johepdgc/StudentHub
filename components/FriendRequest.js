import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";

const ip = '192.168.1.25';

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await fetch(
                `http://${ip}:3000/friend-request/accept`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        senderId: friendRequestId,
                        recepientId: userId,
                    }),
                }
            );

            if (response.ok) {
                setFriendRequests(
                    friendRequests.filter((request) => request._id !== friendRequestId)
                );
                navigation.navigate("Chats");
            }
        } catch (err) {
            console.log("error acceptin the friend request", err);
        }
    };
    return (
        <Pressable
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
            }}
        >
            <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{ uri: item.image }}
            />

            <Text
                style={{ fontSize: 15, fontWeight: "bold", marginLeft: 10, flex: 1 }}
            >
                {item?.username} sent you a friend request!!
            </Text>

            <Pressable
                onPress={() => acceptRequest(item._id)}
                style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
            >
                <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
            </Pressable>
        </Pressable>
    );
};

export default FriendRequest;

const styles = StyleSheet.create({});