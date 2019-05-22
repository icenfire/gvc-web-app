import * as firebase from "firebase/app";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyD3M8CafnCd6KgqIBaZBW3aC08ym_pF9mU",
  authDomain: "ci-nightly.firebaseapp.com",
  databaseURL: "https://ci-nightly.firebaseio.com",
  projectId: "ci-nightly",
  storageBucket: "ci-nightly.appspot.com",
  messagingSenderId: "685893098059"
};
firebase.initializeApp(config);

// export import auth = firebase.auth;
export const auth = firebase.auth;
