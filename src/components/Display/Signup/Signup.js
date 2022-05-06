import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Card, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Signup = () => {
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

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);   // /\d{1}.test(1) = true;
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (user.email && user.password) {
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
        }
        if(user.email && user.password && user.name){
            const postUser = {
                email: user.email,
                name: user.name
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
        e.preventDefault(); // loading off
    }

    return (
        <div className="myCard">
            <Card className="auth-card">
                <Card.Body>
                    <h1>Instagram</h1>
                    <Form className="user-form" onSubmit={handleSubmit}>
                        <Form.Control className="form-control"
                            type="text"
                            placeholder="name"
                            name="name"
                            onBlur={handleBlur}
                        />
                        <Form.Control className="form-control"
                            type="text"
                            placeholder="email"
                            name="email"
                            onBlur={handleBlur}
                        />
                        <Form.Control className="form-control"
                            type="text"
                            name="password"
                            placeholder="password"
                            onBlur={handleBlur}
                        />
                        <Button type="submit" variant="primary">Signup</Button>
                    </Form>
                    <h6>
                        <Link to='/signin'>Already have an account?</Link>
                    </h6>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Signup;