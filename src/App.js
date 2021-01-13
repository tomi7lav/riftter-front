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

const App = () => (
  <Provider store={store}>
      <Router>
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
)

export default App;
