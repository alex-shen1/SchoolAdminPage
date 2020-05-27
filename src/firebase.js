import firebase from "firebase/app";
//these imports are what enable the function calls auth() and database()
import "firebase/auth"; 
import "firebase/database"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "adminpage-b6e0e.firebaseapp.com",
    databaseURL: "https://adminpage-b6e0e.firebaseio.com",
    projectId: "adminpage-b6e0e",
    storageBucket: "adminpage-b6e0e.appspot.com",
    messagingSenderId: "777201403331",
    appId: "1:777201403331:web:9de614ccba431384b0e976",
    measurementId: "G-WBLEN57M12"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;