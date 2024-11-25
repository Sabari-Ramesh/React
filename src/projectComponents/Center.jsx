// Center.js
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Insert from "../insertmeals/insertmeal";
import Update from "../update/update";
import FindAll from "../findall/findall";
import FindAllUsers from "../FindAllUsers/FindAllUsers";
import Advertisement from "./advertisement";
import PageNotFound from "./pageNotFound";
import FindById from "../findbyid/findbyid";
import FindByUserId from "../findbyuserid/findbyuserid";
import FindByDates from "../findByDate/findByDate";
import GroupByCity from "../groupBYCity/groupbycity";
import UserWithMealDetail from "../userWithMealDetail/UserWithMealDetail";

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
    const { user } = this.props;
    const userId = user?.userId || user?.adminId;
    const isAdmin = Boolean(user?.adminRole);

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
                    {/* Conditional Buttons based on user role */}
                    {isAdmin ? (
                      <>
                        {/* Admin Menu Options */}

                        <Link to="/find-all">
                          <Button
                            variant={activeRoute === "/find-all" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/find-all")}
                          >
                            Find All Meal Details
                          </Button>
                        </Link>

                        <Link to="/find-all-users">
                          <Button
                            variant={activeRoute === "/delete" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/delete")}
                          >
                            Find All Users
                          </Button>
                        </Link>

                        <Link to="/findbyid">
                          <Button
                            variant={activeRoute === "/findbyid" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/findbyid")}
                          >
                            Find By MealId
                          </Button>
                        </Link>

                        <Link to="/findbyuserdaterange">
                          <Button
                            variant={activeRoute === "/findbyuserdaterange" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/findbyuserdaterange")}
                          >
                            Find By User By Date
                          </Button>
                        </Link>

                        <Link to="/groupbycity">
                          <Button
                            variant={activeRoute === "/groupbycity" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/groupbycity")}
                          >
                            Group By City
                          </Button>
                        </Link>

                        <Link to="/userwithdetails">
                          <Button
                            variant={activeRoute === "/userwithdetails" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/userwithdetails")}
                          >
                            User With Meal Details
                          </Button>
                        </Link>

                      </>
                    ) : (
                      <>
                        {/* User Menu Options */}

                        <Link to="/insert">
                          <Button
                            variant={activeRoute === "/insert" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/insert")}
                          >
                            Insert Details
                          </Button>
                        </Link>

                        <Link to="/update">
                          <Button
                            variant={activeRoute === "/update" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/update")}
                          >
                            Update
                          </Button>
                        </Link>

                        <Link to="/findbyuserid">
                          <Button
                            variant={activeRoute === "/findbyuserid" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/findbyuserid")}
                          >
                            Find By UserId
                          </Button>
                        </Link>

                        <Link to="/findbyquantiyRange">
                          <Button
                            variant={activeRoute === "/findbyquantiyRange" ? "primary" : "light"}
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/findbyquantiyRange")}
                          >
                            Find By Quantity Range
                          </Button>
                        </Link>

                      </>
                    )}
                  </div>
                </Col>

                {/* MAIN CONTENT */}
                <Col xs={9} className="bg-light text-dark p-3 main-content-col">
                  <Routes>
                    {/* Render routes based on user role */}
                    {isAdmin ? (
                      <>
                        {/* Admin Routes */}
                        <Route path="/find-all" element={<FindAll />} />
                        <Route path="/find-all-users" element={<FindAllUsers />} />
                        <Route path="/findbyid" element={<FindById />} />
                        <Route path="/findbyuserdaterange" element={<FindByDates />} />
                        <Route path="/groupbycity" element={<GroupByCity />} />
                        <Route path="/userwithdetails" element={<UserWithMealDetail />} />
                        
                      </>
                    ) : (
                      <>
                        {/* User Routes */}
                        <Route path="/insert" element={<Insert userId={userId} />} />
                        <Route path="/update" element={<Update userId={userId} />} />
                        <Route path="/findbyuserid" element={<FindByUserId userId={userId} />} />
                        <Route path="/findbyquantiyRange" element={<div>Find By Quantity Range</div>} />
                      </>
                    )}
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


