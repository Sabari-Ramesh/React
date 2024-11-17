import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Insert } from "../insertmeals/insertmeal";
import { Update } from "../update/update";
import { FindAll } from "../findall/findall";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "./main.css";
// NAVBAR CONTENT

export function NavBar() {
  return (
    <Container fluid>
      <nav className="bg-primary text-white">
        <Row className="text-center" style={{ height: "50px" }}>
          <Col className="bg-danger" xs={3}>
            LOGO
          </Col>
          <Col className="text-center fs-5 fw-bold">
            Diet Tracker Application
          </Col>
        </Row>
      </nav>
    </Container>
  );
}

//CENTER COMPONENT

export function Center() {
  const [activeRoute, setActiveRoute] = useState("/");

  // Update activeRoute state when a button is clicked
  const handleButtonClick = (route) => {
    setActiveRoute(route);
  };

  return (
    <Router>
      <Container fluid>
        <Row>
          <Col xs={12} lg={9} className="bg-success p-4">
            {/* Left column with menu */}
            <Row>
              {/* Menu takes the first 3 columns */}
              <Col xs={3} className="bg-dark text-white p-2">
                <div className="menu">
                  {/* Insert Details Button */}
                  <Link to="/insert">
                    <Button
                      variant={activeRoute === "/insert" ? "primary" : "light"}
                      className="w-100 mb-2"
                      onClick={() => handleButtonClick("/insert")}
                    >
                      Insert Details
                    </Button>
                  </Link>

                  {/* Update Button */}
                  <Link to="/update">
                    <Button
                      variant={activeRoute === "/update" ? "primary" : "light"}
                      className="w-100 mb-2"
                      onClick={() => handleButtonClick("/update")}
                    >
                      Update
                    </Button>
                  </Link>

                  {/* Find All Button */}
                  <Link to="/find-all">
                    <Button
                      variant={
                        activeRoute === "/find-all" ? "primary" : "light"
                      }
                      className="w-100 mb-2"
                      onClick={() => handleButtonClick("/find-all")}
                    >
                      Find All
                    </Button>
                  </Link>

                  {/* Delete Button */}
                  <Link to="/delete">
                    <Button
                      variant={activeRoute === "/delete" ? "primary" : "light"}
                      className="w-100 mb-2"
                      onClick={() => handleButtonClick("/delete")}
                    >
                      Delete
                    </Button>
                  </Link>
                </div>
              </Col>

              {/* Content takes the remaining 9 columns */}
              <Col xs={9} className="bg-light text-dark p-3 main-content-col">
                <Routes>
                  <Route path="/insert" element={<Insert />} />
                  <Route path="/update" element={<Update />} />
                  <Route path="/find-all" element={<FindAll />} />
                  <Route path="/delete" element={<div>Delete Content</div>} />
                  <Route path="/" element={<div>Select a menu option</div>} />
                  {/* Default Route */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Col>
            </Row>
          </Col>

          {/* Advertisement takes the last 3 columns on large screens */}
          <Col xs={12} lg={3} className="p-4" style={{ background: "#cccfd4" }}>
            <Advertisement />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

// ADVERTISEMENT CONTENT

function Advertisement() {
  return (
    <>
      <h4>Advertisement</h4>
      Your advertisements content here
    </>
  );
}

//FOOTER CONTENT

export function Footer() {
  return (
    <Container
      fluid
      className="text-white text-center py-3"
      style={{ background: "rgb(40, 42, 54)" }}
    >
      <p className="mb-0">Footer Content</p>
    </Container>
  );
}

export function PageNotFound() {
  return <p>Page Not Found Please Contact Admin</p>;
}
