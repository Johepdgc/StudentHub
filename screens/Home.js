import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Image, Text, Dimensions, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass, faIdBadge, faInbox, faPeopleGroup, faUserGroup, faCalendarDay, faArrowRightFromBracket, faCirclePlus, faComment, faHeart, faBell, faMessage, faShare } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const ip = '192.168.1.29';

const Home = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/get-posts`);
      setPosts(response.data);
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(
        `http://${ip}:3000/posts/${postId}/${userId}/like`
      );
      const updatedPost = response.data;

      const updatedPosts = posts?.map((post) =>
        post?._id === updatedPost._id ? updatedPost : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error en boton de like", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(
        `http://${ip}:3000/posts/${postId}/${userId}/unlike`
      );
      const updatedPost = response.data;
      // Update the posts array with the updated post
      const updatedPosts = posts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      );
      console.log("updated ", updatedPosts)

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.searchButton}>
          <TouchableOpacity onPress={() => { }}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={32} color='white' />
          </TouchableOpacity>
        </View>
        <Text style={styles.navbarText}>Student HUB</Text>
        <View style={styles.inboxButton}>
          <TouchableOpacity onPress={() => { navigation.navigate('Inbox') }}>
            <FontAwesomeIcon icon={faInbox} size={32} color='white' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.iconButtons}>
        <TouchableOpacity onPress={() => { navigation.navigate('Profile') }}>
          <FontAwesomeIcon icon={faIdBadge} size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (navigation.navigate('Chat'))}>
          <FontAwesomeIcon icon={faMessage} size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <FontAwesomeIcon icon={faPeopleGroup} size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (navigation.navigate('Search'))}>
          <FontAwesomeIcon icon={faUserGroup} size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <FontAwesomeIcon icon={faCalendarDay} size={32} color='white' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (navigation.navigate('Post'))}>
          <FontAwesomeIcon icon={faCirclePlus} size={32} color='white' />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {posts?.map((post) => (
          <View key={post._id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image style={styles.avatar} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/149/149071.png' }} />
              <Text style={styles.postTitle}>{post?.user?.username}</Text>
            </View>
            <Text style={styles.postContent}>{post?.content}</Text>
            <View style={styles.actionButtons}>
              {post?.likes?.includes(userId) ? (
                <TouchableOpacity onPress={() => handleDislike(post?._id)}>
                  <FontAwesomeIcon icon={faHeart} size={30} color='red' />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleLike(post?._id)}>
                  <FontAwesomeIcon icon={faHeart} size={30} color='#0D203C' />
                </TouchableOpacity>
              )}
              <FontAwesomeIcon icon={faComment} size={30} color='#0D203C' />
              <FontAwesomeIcon icon={faShare} size={30} color='#0D203C' />
            </View>
            <Text style={styles.actionLabels}>{post?.likes?.length} likes • {post?.replies?.length} reply</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D203C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  navbar: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  inboxButton: {
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
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D203C'
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionLabels: {
    fontSize: 12,
    color: 'gray',
    marginTop: 10,
  },
});

export default Home;