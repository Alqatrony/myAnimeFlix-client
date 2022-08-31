import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Nav } from "react-bootstrap";
import { TbMovie, TbUserCircle, TbLogout } from 'react-icons/tb';
import './navbar-view.scss';

class NavBar extends Component {
  isAuth() {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  }

  render() {
    const { onBackLog, user } = this.props;
    return (
      <Navbar className="main-nav" collapseOnSelect sticky="top" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand className="navbar-logo" href="/">
            MyAnimeFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {this.isAuth() && <Nav.Link href="/">
              <TbMovie className="nav-icon" />Animes</Nav.Link>}
              {this.isAuth() && (
                <Nav.Link href={`/users/${user}`}>
                  <TbUserCircle className="nav-icon" />{user}</Nav.Link>
              )}
              {!this.isAuth() && <Nav.Link className="nav-text" href="/">Login</Nav.Link>}
              {this.isAuth() && (
                <Nav.Link className="logout" onClick={() => onBackLog()}>
                  <TbLogout className="nav-logout" />Logout</Nav.Link>
              )}
              {!this.isAuth() && <Nav.Link className="nav-text" href="/register">Register</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

NavBar.propTypes = {
  user: PropTypes.string,
  onBackLog: PropTypes.func.isRequired,
};