import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Insert from "../insertmeals/insertmeal";
import Update from "../update/update";
import FindAll from "../findall/findall"
import DeleteDetails from "../Delete/delete"
import Advertisement from "./advertisement";
import PageNotFound from "./pageNotFound";

class Center extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      activeRoute: "/",
    };
  }

  handleButtonClick = (route) => {
    this.setState({ activeRoute: route });
  };

  render() {
    const { activeRoute } = this.state;

    return (
      <Router>
        <Container fluid>
          <Row>
            <Col xs={12} lg={9}>
              <Row>
                <Col
                  xs={3}
                  className="text-white p-3 rounded"
                  style={{ backgroundColor: "#b4ceff" }}
                >
                  <div className="menu">
                    {/* Insert Details Button */}
                    <Link to="/insert">
                      <Button
                        variant={activeRoute === "/insert" ? "primary" : "light"}
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/insert")}
                      >
                        Insert Details
                      </Button>
                    </Link>

                    {/* Update Button */}
                    <Link to="/update">
                      <Button
                        variant={activeRoute === "/update" ? "primary" : "light"}
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/update")}
                      >
                        Update
                      </Button>
                    </Link>

                    {/* Find All Button */}
                    <Link to="/find-all">
                      <Button
                        variant={activeRoute === "/find-all" ? "primary" : "light"}
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/find-all")}
                      >
                        Find All
                      </Button>
                    </Link>

                    {/* Delete Button */}
                    <Link to="/delete">
                      <Button
                        variant={activeRoute === "/delete" ? "primary" : "light"}
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/delete")}
                      >
                        Delete
                      </Button>
                    </Link>

                    {/* Find By Meal ID */}
                    <Link to="/findbyid">
                      <Button
                        variant={activeRoute === "/findbyid" ? "primary" : "light"}
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/findbyid")}
                      >
                        Find By MealId
                      </Button>
                    </Link>

                    {/* Find By User ID */}
                    <Link to="/findbyuserid">
                      <Button
                        variant={activeRoute === "/findbyuserid" ? "primary" : "light"}
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/findbyuserid")}
                      >
                        Find By UserId
                      </Button>
                    </Link>

                    {/* Find By Quantity Range */}
                    <Link to="/findbyquantiyRange">
                      <Button
                        variant={
                          activeRoute === "/findbyquantiyRange" ? "primary" : "light"
                        }
                        className="w-100 mb-2"
                        onClick={() => this.handleButtonClick("/findbyquantiyRange")}
                      >
                        Find By QuantiyRange
                      </Button>
                    </Link>
                  </div>
                </Col>

                {/* MAIN CONTENT */}
                <Col xs={9} className="bg-light text-dark p-3 main-content-col">
                  <Routes>
                    <Route path="/insert" element={<Insert />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/find-all" element={<FindAll />} />
                    <Route path="/delete" element={<DeleteDetails />} />
                    <Route path="/findbyid" element={<div>Find By Id</div>} />
                    <Route path="/findbyquantiyRange" element={<div>Find By Quantity Range</div>} />
                    <Route path="/findbyuserid" element={<div>Find By User Id</div>} />
                    <Route path="/" element={<div>Select a menu option</div>} />
                    {/* Default Route */}
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Col>
              </Row>
            </Col>

            {/* Advertisement Column */}
            <Col xs={12} lg={3} className="p-4" style={{ background: "#cccfd4" }}>
              <Advertisement />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default Center;
