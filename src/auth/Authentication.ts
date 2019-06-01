import { auth } from "../firebase"

let user: any

auth().onAuthStateChanged(fbUser => {
  user = fbUser
})

const Authentication = {
  signInWithEmailAndPassword(email: string, pw: string) {
    auth()
      .signInWithEmailAndPassword(email, pw)
      .then(() => console.log("Login succesful!"))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // ...
        console.log(error)
      })
  },

  signOut() {
    auth().signOut()
  },

  isAuthenticated() {
    return !!user
  }
}

export default Authentication
