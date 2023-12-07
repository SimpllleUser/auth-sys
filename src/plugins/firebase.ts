import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD0zJ8lc_PqWVS2SwGj5K2MgHfaEF0pT9c',
  authDomain: 'note-d3618.firebaseapp.com',
  databaseURL: 'https://note-d3618-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'note-d3618',
  storageBucket: 'note-d3618.appspot.com',
  messagingSenderId: '26255156252',
  appId: '1:26255156252:web:c100c472a2fa686e18abd9',
  measurementId: 'G-XSEV3NBY3X',
};

export const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
