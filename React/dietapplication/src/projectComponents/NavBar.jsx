
import React, { Component } from "react";
import { Row, Col, Container, Navbar } from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector";
//import {UserContext} from "../contexts/UserProvider "
import "./main.css";
import logo from "./applelogo.png";


export default class NavBar extends Component {
  static contextType = UserContext; 

  render() {
    const { userName, username } = this.context || {};
    const displayName = userName || username;
    console.log(displayName);

    return (
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <Container fluid>
          <Row className="w-100 align-items-center">
            {/* Logo Section */}
            <Col xs={3}>
              <img src={logo} alt="LOGO" className="navbar-logo" />
            </Col>

            {/* Title Section */}
            <Col className="text-center">
              <Navbar.Brand className="fs-5 fw-bold text-white m-0">
                Diet Tracker Application
              </Navbar.Brand>
            </Col>

            {/* Username Section */}
            <Col xs={3} className="text-end pe-4">
              <p className="fs-6 fw-bold m-0 text-white">
                Welcome, {displayName}!
              </p>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}
