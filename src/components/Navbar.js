import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const NavbarComponent = () => {
    const history = useHistory();


    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/home">Pariwisata</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/list">List</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="/register">
                            Register
                        </Nav.Link>
                        <Nav.Link onClick={Logout} >Log Out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;