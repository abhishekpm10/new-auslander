import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBma53zCVsrGvssNxQd-EYXmDu6pybmylM",
  authDomain: "crwn-db-e8117.firebaseapp.com",
  databaseURL: "https://crwn-db-e8117.firebaseio.com",
  projectId: "crwn-db-e8117",
  storageBucket: "crwn-db-e8117.appspot.com",
  messagingSenderId: "30101043466",
  appId: "1:30101043466:web:7af2edf1a63bca3c90a2f3",
  measurementId: "G-WTZ56MHZBP"
};


firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    let hint=[false,false,false,false,false,false];
    let showAnswer=[false,false,false,false,false,false];
    let submitAnswer=[false,false,false,false,false,false];
    const score=0;
    let finalStory='';
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        score,
        hint,
        showAnswer,
        submitAnswer,
        finalStory,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);



export default firebase;
