import React from "react"
import { Router } from "@reach/router"
import Home from './views/Home';
import Users from './views/Users';

function App() {
  return (
    <Router>
      <Home path="/" />
      <Users path="users" />
    </Router>
  );
}

export default App;
