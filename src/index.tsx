import { createMuiTheme } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
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
      main: "#C6B28E"
      // dark: "#616161"
    },
    secondary: {
      main: "#4D4D4D"
      // light: "#D6CKBC"
    }
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
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
