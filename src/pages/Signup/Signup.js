import React, { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import Footar from '../../components/Footar/Footar';

const Signup = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        imageURL: "",
        following: [],
        followers: []
    });
    const [signupError, setSignupError] = useState();
    const [emailpassError, seteamilpassError] = useState(false);

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
            const isPasswordLengthM = e.target.value.length >= 6;
            const isPasswordLengthMx = e.target.value.length <= 10
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordLengthM && isPasswordLengthMx && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSignup = (e) => {
        if (user.name && user.email && user.password) {
            seteamilpassError(false);
            const url = `http://localhost:5000/signup`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setSignupError(data.error);
                    } else {
                        setSigninUser(user);
                        setSignupError();
                        history.replace(from);
                    }
                });
        } else {
            seteamilpassError(true);
        }
        e.preventDefault();
    }
    return (
        <>
            <div style={{ backgroundColor: "#f8f6f6", padding: "20px" }}>
                <Card className="auth-card">
                    <Card.Body>
                        <h1 style={{ fontSize: "50px", marginBottom: "70px" }}>Signup</h1>
                        <Form className="user-form" onSubmit={handleSignup}>
                            <Form.Control className="form-control"
                                type="text"
                                placeholder="your full name"
                                name="name"
                                required
                                onBlur={handleBlur}
                            />
                            <Form.Control className="form-control"
                                type="text"
                                placeholder="your email"
                                name="email"
                                required
                                onBlur={handleBlur}
                            />
                            <Form.Control className="form-control"
                                type="text"
                                placeholder="your password"
                                name="password"
                                required
                                onBlur={handleBlur}
                            />
                            {emailpassError && <h5 style={{ fontWeight: "500", fontSize: "16px", color: "red" }}>Your email or password format invalid or password contains 6-10 characters or password must have a number</h5>}
                            <button className="common-button" style={{ marginTop: "100px" }} type="submit" variant="primary">Signup</button>
                            {signupError && <h5 style={{ fontWeight: "500", fontSize: "16px", color: "red" }}>{signupError}</h5>}
                        </Form>
                    </Card.Body>
                </Card>
                <Card style={{ marginTop: "4px" }} className='auth-card'>
                    <Card.Body>
                        <div>
                            <h5 style={{ fontSize: "18px" }}>
                                <Link style={{ textDecoration: "none", color: "black" }} to='/signin'>
                                    Already have an account? <span className='hover-underline' style={{ color: "#fc7fb2" }}>Signin here</span>
                                </Link>
                            </h5>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <Footar></Footar>
        </>
    );
};

export default Signup;