import DateFnsUtils from "@date-io/date-fns"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import firebase from "firebase"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase"
import { BrowserRouter } from "react-router-dom"
import { applyMiddleware, compose, createStore } from "redux"
import { createFirestoreInstance, getFirestore, reduxFirestore } from "redux-firestore"
import thunk, { ThunkMiddleware } from "redux-thunk"

import { rootReducer } from "../src/store/reducers/rootReducer"
import App from "./components/App"
import { theme } from "./theme"
import { globalObjects } from "./utils/globalObjects"

// Define global objects for testing
globalObjects()

declare let module: any

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({
        getFirestore,
        getFirebase,
      }) as ThunkMiddleware
    ),
    reduxFirestore(firebase)
  )
)

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
}

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
