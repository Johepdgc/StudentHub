import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faIdBadge, faInbox, faPeopleGroup, faUserGroup, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigator = useNavigation();
  const [postContent, setPostContent] = useState('');

  const handleSubmit = () => {
    // Add the logic to handle post submission
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.searchButton}>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={32} color='white' />
          </TouchableOpacity>
        </View>
        <Text style={styles.navbarText}>Student HUB</Text>
      </View>
      <View style={styles.iconButtons}>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesomeIcon icon={faIdBadge} size={32} color='white' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => (navigator.navigate('Chat'))}>
        <FontAwesomeIcon icon={faInbox} size={32} color='white' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesomeIcon icon={faPeopleGroup} size={32} color='white' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesomeIcon icon={faUserGroup} size={32} color='white' />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesomeIcon icon={faCalendarDay} size={32} color='white' />
      </TouchableOpacity>
      </View>
      <View style={styles.postInput}>
        <TextInput style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="What's on your mind?"
          value={postContent}
          onChangeText={setPostContent}
        />
        <Button title="Post" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D203C',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  navbar: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  navbarText: {
    position: 'absolute',
    color: 'white',
    left: '50%',
    transform: [{ translateX: -50 }],
    justifyContent: 'center',
    fontSize: screenWidth * 0.05,
  },
  searchButton: {
    alignItems: 'center',
  },
  iconButtons: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  postInput: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 70,
    width: '80%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});