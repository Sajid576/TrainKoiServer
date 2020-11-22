var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/analytics");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDsQW6XOLvacHCoCE4_aylbPnb0vqacyTI",
  authDomain: "fir-app-f3d37.firebaseapp.com",
  databaseURL: "https://fir-app-f3d37.firebaseio.com",
  projectId: "fir-app-f3d37",
  storageBucket: "fir-app-f3d37.appspot.com",
  messagingSenderId: "369290148095",
  appId: "1:369290148095:web:dc3f12db73c3a98f3a74ca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports=firebase;