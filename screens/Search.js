import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';

const ip = "192.168.1.25";

const Search = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    const searchUsers = () => {
        axios.get(`http://${ip}:3000/users/search?username=${username}`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    const sendFriendRequest = (userId) => {
        axios.post(`http://${ip}:3000/friend-requests`, { userId })
            .then(response => {
                alert('Friend request sent');
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <View>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Search username"
            />
            <Button title="Search" onPress={searchUsers} />
            <FlatList
                data={users}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.username}</Text>
                        <Button title="Add Friend" onPress={() => sendFriendRequest(item._id)} />
                    </View>
                )}
            />
        </View>
    );
};

export default Search;