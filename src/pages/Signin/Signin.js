import React, { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import Footar from '../../components/Footar/Footar';

const Signin = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [emailpassError, seteamilpassError] = useState(false);
    const [signinError, setSigninError] = useState();

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
    const handleSignin = (e) => {
        if (user.email && user.password) {
            fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        console.log("error--->", data.error);
                        setSigninError(data.error);
                        seteamilpassError(false);
                    }
                    else {
                        setSigninUser(user);
                        history.replace(from);
                        setSigninError();
                    }
                })
        } else {
            seteamilpassError(true);
            setSigninError();
        }
        e.preventDefault();
    }
    return (
        <>
            <div style={{ backgroundColor: "#f8f6f6", padding: "20px" }}>
                <Card className="auth-card">
                    <Card.Body>
                        <h1 style={{ fontSize: "50px", marginBottom: "70px" }}>Signin</h1>
                        <Form className="user-form" onSubmit={handleSignin}>
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
                            <button className="common-button" style={{ marginTop: "100px" }} type="submit" variant="primary">Signin</button>
                            {signinError && <h5 style={{ fontWeight: "500", fontSize: "16px", color: "red" }}>{signinError}</h5>}
                        </Form>
                    </Card.Body>
                </Card>
                <Card style={{ marginTop: "4px" }} className='auth-card'>
                    <Card.Body>
                        <div>
                            <h5 style={{ fontSize: "18px" }}>
                                <Link style={{ textDecoration: "none", color: "black" }} to='/signup'>
                                    Don't hane an account? <span className='hover-underline' style={{ color: "#fc7fb2" }}>Signup here</span>
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

export default Signin;