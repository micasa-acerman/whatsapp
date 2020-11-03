import firebase from "firebase";

const firebaseConfig =  {
    apiKey: "AIzaSyBTf9gET7N1S6fBQTOHOlHWNar2l9IJuwc",
    authDomain: "react-chat-8f283.firebaseapp.com",
    databaseURL: "https://react-chat-8f283.firebaseio.com",
    projectId: "react-chat-8f283",
    storageBucket: "react-chat-8f283.appspot.com",
    messagingSenderId: "151504121252",
    appId: "1:151504121252:web:889c61d8448f66d587e531"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth,provider}
  export default db