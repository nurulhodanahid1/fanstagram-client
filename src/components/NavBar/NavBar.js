import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./NavBar.css";

const Menu = () => {
    const [signInUser, setSignInUser] = useContext(UserContext);
    return (
        <div>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand><Link className="nav-brand" to="/">FanstaGram</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav className="justify-content-center align-items-center">
                            <Link className="menu-item menu-custom" to="/create">CreatePost</Link>
                            <Link className="menu-item menu-custom" to="/profile">Profile</Link>
                            {
                                signInUser.email && <Link className="menu-btn menu-item" to="/signin">
                                    <Button id="navbar-button" className="signup-button" onClick={() => setSignInUser({})} variant="success">Log out</Button>
                                </Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Menu;