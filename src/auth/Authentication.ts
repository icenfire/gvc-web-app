import "firebase/auth";

import * as firebase from "firebase/app";

let user: any;

firebase.auth().onAuthStateChanged(fbUser => {
  user = fbUser;
});

const Authentication = {
  signInWithEmailAndPassword(email: string, pw: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error);
      });
  },

  signOut() {
    firebase.auth().signOut();
  },

  isAuthenticated() {
    return !!user;
  }
};

export default Authentication;
