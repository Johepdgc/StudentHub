import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = () => {
    // Add the logic to handle post submission
  };

  useEffect(() => {
    // HACER CAMBIOS 
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });
  }, []);

  function handleSubmit() {
    const messagesRef = firebase.database().ref('messages');
    messagesRef.push({
      text: postContent,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    setPostContent('');
  }

  return (
    <View style={(StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      input: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
      },
    })).container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item.timestamp.toString()}
      />
      <TextInput
        style={(StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
          },
          input: {
            height: 80,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 12,
            paddingLeft: 8,
          },
        })).input}
        multiline
        numberOfLines={4}
        placeholder="What's on your mind?"
        value={postContent}
        onChangeText={setPostContent}
      />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
}



  return (
    <View style={(StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
      },
      input: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
      },
    })).container}>
      <TextInput
        style={(StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
          },
          input: {
            height: 80,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 12,
            paddingLeft: 8,
          },
        })).input}
        multiline
        numberOfLines={4}
        placeholder="What's on your mind?"
        value={postContent}
        onChangeText={setPostContent}
      />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});