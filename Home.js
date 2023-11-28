import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function CreatePost() {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = () => {
    // Add the logic to handle post submission
  };

  useEffect(() => {
    //para hacer cambios 
    const messagesRef = firebase.database().ref('messages');
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);
        setMessages(messagesArray);
      }
    });
  }, []);

  const handleSubmit= () =>{
    const messagesRef = firebase.database().ref('messages');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
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