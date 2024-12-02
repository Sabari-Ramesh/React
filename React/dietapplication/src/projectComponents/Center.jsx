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
import QuantityRange from "../quantityRange/quantityrange";
import FindCalories from "../findCalories/findCalories";
import { UserContext } from "../Login/LoginSelector"; // Import UserContext
//import {UserContext} from "../contexts/UserProvider "
import "./center.css";
import MealGraph from "../graph/graph";
import DietStore from "../homePage/Home"

class Center extends Component {
  constructor(props) {
    
    super(props);
  

    this.state = {
      activeRoute: "/", // Set the initial route based on the role
    };
  }

  static contextType = UserContext;

  handleButtonClick = (route) => {
    this.setState({ activeRoute: route });
  };

  handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  render() {
    const { activeRoute } = this.state;
    const user = this.context;
    const isAdmin = Boolean(user?.adminRole);
    return (
      <Router>
        <Container fluid className="main-container">
          <Row>
            <Col xs={12} lg={9}>
              <Row>
                <Col
                  xs={3}
                  className="text-white p-3 rounded menu-container"
                  style={{ backgroundColor: "#b4ceff" }}
                >
                  <div className="menu">
                    {/* Conditional Buttons based on user role */}
                    {isAdmin ? (
                      <>
                        <Link to="/find-all">
                          <Button
                            variant={
                              activeRoute === "/find-all" ? "primary" : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/find-all")}
                          >
                            Find All Meal Details
                          </Button>
                        </Link>
                        <Link to="/find-all-users">
                          <Button
                            variant={
                              activeRoute === "/find-all-users"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/find-all-users")
                            }
                          >
                            Find All Users
                          </Button>
                        </Link>
                        <Link to="/findbyid">
                          <Button
                            variant={
                              activeRoute === "/findbyid" ? "primary" : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/findbyid")}
                          >
                            Find By MealId
                          </Button>
                        </Link>
                        <Link to="/findbyuserdaterange">
                          <Button
                            variant={
                              activeRoute === "/findbyuserdaterange"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/findbyuserdaterange")
                            }
                          >
                            Find By User By Date
                          </Button>
                        </Link>
                        <Link to="/groupbycity">
                          <Button
                            variant={
                              activeRoute === "/groupbycity"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/groupbycity")
                            }
                          >
                            Group By City
                          </Button>
                        </Link>
                        <Link to="/userwithdetails">
                          <Button
                            variant={
                              activeRoute === "/userwithdetails"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/userwithdetails")
                            }
                          >
                            User With Meal Details
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/insert">
                          <Button
                            variant={
                              activeRoute === "/insert" ? "primary" : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/insert")}
                          >
                            Insert Details
                          </Button>
                        </Link>
                        <Link to="/update">
                          <Button
                            variant={
                              activeRoute === "/update" ? "primary" : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/update")}
                          >
                            Update / Delete
                          </Button>
                        </Link>
                        <Link to="/findbyuserid">
                          <Button
                            variant={
                              activeRoute === "/findbyuserid"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/findbyuserid")
                            }
                          >
                            Find By UserId
                          </Button>
                        </Link>
                        <Link to="/findbyquantiyRange">
                          <Button
                            variant={
                              activeRoute === "/findbyquantiyRange"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/findbyquantiyRange")
                            }
                          >
                            Find By Quantity Range
                          </Button>
                        </Link>
                        <Link to="/findCalories">
                          <Button
                            variant={
                              activeRoute === "/findCalories"
                                ? "primary"
                                : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() =>
                              this.handleButtonClick("/findCalories")
                            }
                          >
                            Find Calories
                          </Button>
                        </Link>
                        <Link to="/graph">
                          <Button
                            variant={
                              activeRoute === "/graph" ? "primary" : "light"
                            }
                            className="w-100 mb-2"
                            onClick={() => this.handleButtonClick("/graph")}
                          >
                            MealGraph
                          </Button>
                        </Link>
                      </>
                    )}
                    {/* Logout Button */}
                    <Button
                      variant="danger"
                      className="w-100 mt-3"
                      onClick={this.handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </Col>

                {/* MAIN CONTENT */}
                <Col xs={9} className="bg-light text-dark p-3 main-content-col">
                  <Routes>
                    {/* Admin Routes */}
                    {isAdmin ? (
                      <>
                        <Route path="/find-all" element={<FindAll />} />
                        <Route
                          path="/find-all-users"
                          element={<FindAllUsers />}
                        />
                        <Route path="/findbyid" element={<FindById />} />
                        <Route
                          path="/findbyuserdaterange"
                          element={<FindByDates />}
                        />
                        <Route path="/groupbycity" element={<GroupByCity />} />
                        <Route
                          path="/userwithdetails"
                          element={<UserWithMealDetail />}
                        />
                      </>
                    ) : (
                      <>
                        {/* User Routes */}
                        <Route path="/insert" element={<Insert />} />
                        <Route path="/update" element={<Update />} />
                        <Route
                          path="/findbyuserid"
                          element={<FindByUserId />}
                        />
                        <Route
                          path="/findbyquantiyRange"
                          element={<QuantityRange />}
                        />
                        <Route
                          path="/findCalories"
                          element={<FindCalories />}
                        />
                        <Route path="/graph" element={<MealGraph />} />
                      </>
                    )}
                    <Route path="/" element={<DietStore  />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Col>
              </Row>
            </Col>

            {/* Advertisement Column */}
            <Col
              xs={12}
              lg={3}
              className="p-4"
              style={{ background: "#cccfd4" }}
            >
              <Advertisement />
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default Center;

