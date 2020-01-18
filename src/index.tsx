import { createMuiTheme } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { createStore } from "redux"

import { rootReducer } from "../src/store/reducers/rootReducer"
import App from "./components/App"

declare let module: any

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#C6B28E",
      dark: "#616161"
    },
    secondary: {
      main: "#4D4D4D",
      light: "#D6CKBC"
    }
  }
})

const store = createStore(rootReducer)

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
