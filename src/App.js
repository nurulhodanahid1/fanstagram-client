import React, {useState, createContext} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Signin from "./components/Display/Signin/Signin";
import Signup from "./components/Display/Signup/Signup";
import Profile from "./components/Display/Profile/Profile";
import CreatePost from "./components/Display/CratePost/CreatePost";
import PrivateRoute from "./components/Display/PrivateRoute/PrivateRoute";
import UserProfile from "./components/Display/UserProfile/UserProfile";
import Home from "./components/Display/Home/Home";

export const UserContext = createContext();

function App() {
  const [signinUser, setSigninUser] = useState({});
  return (
    <UserContext.Provider value={[signinUser, setSigninUser]}>
        <Router>
          {
            signinUser.email && <NavBar></NavBar>
          }
          <Switch>
            <Route path="/signin">
              <Signin></Signin>
            </Route>
            <Route path="/signup">
              <Signup></Signup>
            </Route>
            <PrivateRoute path="/profile">
              <Profile></Profile>
            </PrivateRoute>
            <PrivateRoute path="/create">
              <CreatePost></CreatePost>
            </PrivateRoute>
            <PrivateRoute path="/userProfile/:UserId">
              <UserProfile></UserProfile>
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Home></Home>
            </PrivateRoute>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
