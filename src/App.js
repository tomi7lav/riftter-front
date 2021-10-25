import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import Login from './views/Login';
import Welcome from './views/Welcome';
import Register from './views/Register';
import Home from './views/Home';
import Profile from './views/Profile';
import store from './reducers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Globals from './GlobalStyles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#21211f',
      dark: '#000000',
    },
    secondary: {
      main: '#00BFFF',
    },
  },  
});

const App = () => (
  <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Globals />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile/:profileId">
              <Profile />
            </Route>
            <Route path="/">
              <Welcome />
            </Route>
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>
  
)

export default App;
