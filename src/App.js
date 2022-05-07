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
import Posts from "./components/Display/Posts";
import UserProfile from "./components/Display/UserProfile/UserProfile";

export const UserContext = createContext();

function App() {
  const [signinUser, setSigninUser] = useState({});
  return (
    <UserContext.Provider value={[signinUser, setSigninUser]}>
        <Router>
          <h1>{signinUser.email} And {signinUser.name}</h1>
          <NavBar></NavBar>
          <Switch>
            <Route path="/signin">
              <Signin></Signin>
            </Route>
            <Route path="/signup">
              <Signup></Signup>
            </Route>
            <Route path="/profile">
              <Profile></Profile>
            </Route>
            <Route path="/create">
              <CreatePost></CreatePost>
            </Route>
            <Route path="/userProfile/:UserId">
              <UserProfile></UserProfile>
            </Route>
            <PrivateRoute path="/orders">
              {/* <Orders></Orders> */}
            </PrivateRoute>

            <Route exact path="/">
              <Posts></Posts>
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
