import 'firebase/auth'
import 'firebase/firestore'
import { firebaseSetup } from '../config'

import firebase from 'firebase/app'

var config = firebaseSetup

export const app = firebase.initializeApp(config)
export const auth = firebase.auth
export const db = firebase.firestore()

export default firebase
