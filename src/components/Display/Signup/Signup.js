import React, { useContext, useState } from 'react';
import "./Signup.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Card, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';
import appleLogo from './img/apple-button.png';
import googlePlayLogo from './img/googleplay-button.png'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Signup = () => {
    const [signupError, setSignupError] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        err: "",
        success: false
    });

    const [signinUser, setSigninUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const fbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedinUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        }
        setUser(signedinUser);
        setSigninUser(signedinUser);
        history.replace(from);
        const user = result.user;
        // console.log("after fb sign in", user)
        if(email && displayName){
            const postUser = {
                email: email,
                name: displayName,
                imageURL: photoURL,
                following: [],
                followers: []
            };
            const url = `http://localhost:5000/addUsers`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postUser)
            })
                .then(res => console.log("server site response successfully", res));
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordLengthM = e.target.value.length >= 6;
            const isPasswordLengthMx = e.target.value.length <=10
            const passwordHasNumber = /\d{1}/.test(e.target.value);   // /\d{1}.test(1) = true;
            isFieldValid = isPasswordLengthM && isPasswordLengthMx && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (user.email && user.password && user.name) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setSigninUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.err = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

            const postUser = {
                email: user.email,
                name: user.name,
                imageURL: "",
                following: [],
                followers: []
            };
            const url = `http://localhost:5000/addUsers`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postUser)
            })
                .then(res => console.log("server site response successfully", res));
        }else{
            setSignupError(true);
        }
        e.preventDefault(); // loading off
    }

    return (
        <div style={{ backgroundColor: "#f8f6f6" }} className="myCard">
            <Card className="auth-card">
                <Card.Body>
                    <h1 style={{ fontSize: "50px" }}>FanstaGram</h1>
                    <Form className="user-form" onSubmit={handleSubmit}>
                        <Form.Control className="form-control"
                            type="text"
                            placeholder="your full name"
                            name="name"
                            required
                            onBlur={handleBlur}
                        />
                        <Form.Control className="form-control"
                            type="text"
                            placeholder="email: example@gmail.com"
                            name="email"
                            required
                            onBlur={handleBlur}
                        />
                        <Form.Control className="form-control"
                            type="text"
                            name="password"
                            placeholder="password: password contains 6-10 characters"
                            required
                            onBlur={handleBlur}
                        />
                        <Button className="signup-button" type="submit">Signup</Button>
                    </Form>
                    {
                        signupError && <p style={{color:"#ED4956", marginTop: "5px" }}>Email or Password format in not valid or Password must have a number</p>
                    }
                    <div className="separator">
                        <span></span>
                        <div className="or">OR</div>
                        <span></span>
                    </div>
                    <div className="fb-forgot">
                        <div className='facebook-login-btn'>
                            <h5 onClick={fbSignIn}>Login with Facebook</h5>
                        </div>
                        <div className='forgot'>
                            <h6>Forgot your password?</h6>
                        </div>
                    </div>

                </Card.Body>
            </Card>
            <Card style={{ marginTop: "2px" }} className='auth-card'>
                <Card.Body>
                    <div>"
                        <h5 style={{ fontSize: "18px" }}>
                            Already have an account? <Link style={{ textDecoration: "none" }} to='/signin'>
                                <span className="underline" style={{ color: "#139CF7" }}>Login here</span></Link>
                        </h5>
                    </div>
                </Card.Body>
            </Card>

            <div className="app-download flex direction-column align-items-center">
                <h5 style={{ fontSize: "18px", marginBottom: "15px" }}>Get the app</h5>
                <div className="flex justify-content-center">
                    <img src={appleLogo} alt="" />
                    <img src={googlePlayLogo} alt="" />
                </div>
            </div>
        </div>

    );
};

export default Signup;