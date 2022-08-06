import React, { useState, createContext } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import CreatePost from "./pages/CreatePost/CreatePost";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Menu from "./components/Menu/Menu";
import UserProfile from "./pages/UserProfile/UserProfile";

export const UserContext = createContext();

function App() {
  const [signinUser, setSigninUser] = useState({});
  return (
    <UserContext.Provider value={[signinUser, setSigninUser]}>
      <Router>
        <Menu></Menu>
        <Switch>
          <Route path="/signin">
            <Signin></Signin>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute path="/profile">
            <Profile></Profile>
          </PrivateRoute>
          <PrivateRoute path="/userProfile/:UserId">
            <UserProfile></UserProfile>
          </PrivateRoute>
          <PrivateRoute path="/createPost">
            <CreatePost></CreatePost>
          </PrivateRoute>
          <Route exact path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
