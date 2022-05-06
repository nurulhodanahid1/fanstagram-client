import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./NavBar.css";

const Menu = () => {
    const [signInUser, setSignInUser] = useContext(UserContext);
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link className="nav-brand" to="/">Instagram</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="justify-content-center align-items-center">
                            <Link className="menu-item" to="/signin">Signin</Link>
                            <Link className="menu-item" to="/signup">Signup</Link>
                            <Link className="menu-item" to="/profile">Profile</Link>
                            <Link className="menu-item" to="/create">CreatePost</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;