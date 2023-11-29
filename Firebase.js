import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDh2zEmvxOAbIajGADawr3k9TS76uZlYEY',
  authDomain: 'studenthubrn.firebaseapp.com',
  databaseURL: 'TU_DATABASE_URL',
  projectId: 'studenthubrn',
  storageBucket: 'studenthubrn.appspot.com',
  messagingSenderId: '346883025349',
  appId: '1:346883025349:web:34f129578124bf341983ac',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
