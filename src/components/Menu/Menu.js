import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Menu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Menu = () => {
    const [signinUser, setSigninUser] = useContext(UserContext);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:5000/users';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setUser(data)
            })
    }, []);
    const findUser = user.find(e => e.email === signinUser.email);
    return (
        <div>
            <Navbar style={{ backgroundColor: "#fff" }} expand="lg">
                <Container>
                    <Navbar.Brand><Link className="nav-brand" to="/">FansTagram</Link></Navbar.Brand>
                    <Navbar.Toggle className="navbar-toggle-custom" aria-controls="basic-navbar-nav"> <FontAwesomeIcon style={{ color: "black" }} className="navbar-toggle-icon" icon={faBars} /> </Navbar.Toggle>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="justify-content-center align-items-center">
                            <Link className="menu-item" to="/home">Home</Link>
                            <Link className="menu-item" to="/createPost">Add Post</Link>
                            <Link className="menu-item menu-custom" to="/profile">Profile</Link>
                            {
                                signinUser.email ? <Link className="menu-btn menu-item" onClick={() => setSigninUser({})} to="/signin">Log out</Link>
                                    : <Link className="menu-item menu-item" to="signin">Log in</Link>
                            }
                            {findUser ? <Link className="menu-item" to="/profile">{findUser?.name}</Link>
                            : <Link className="menu-item" to="/profile">{signinUser.name}</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;