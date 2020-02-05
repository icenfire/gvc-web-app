import DateFnsUtils from "@date-io/date-fns"
import { createMuiTheme } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { getFirebase, ReactReduxFirebaseProvider } from "react-redux-firebase"
import { BrowserRouter } from "react-router-dom"
import { applyMiddleware, compose, createStore } from "redux"
import { createFirestoreInstance, getFirestore, reduxFirestore } from "redux-firestore"
import thunk from "redux-thunk"

import { rootReducer } from "../src/store/reducers/rootReducer"
import App from "./components/App"
import firebase from "./firebase"

declare let module: any

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#C3BFBB", // List items
      light: "#D6CDBC", // Signin button
      dark: "#C6B28E", // Text, star,
      contrastText: "#7F8082"

      // main: "#C6B28E" // Given
      // dark: "#616161" // Given
    },
    secondary: {
      main: "#7F8082", // Don't have account & Circle fill & Main background
      dark: "#4D4D4D", // Appbar
      light: "#FFFFFF", // White
      contrastText: "#C3BFBB"

      // #616161 // Root background
      // main: "#4D4D4D" // Given
      // light: "#D6CKBC" // Given
    },
    background: {
      default: "#616161",
      paper: "#FFFFFF"
    }
    // text: {
    //   primary: "#7F8082",
    //   secondary: "#C6B28E"
    // }
  }
})

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore })),
    reduxFirestore(firebase)
  )
)

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
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
