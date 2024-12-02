import React, { createContext, Component } from "react";
import { Container, Button, Navbar, Nav, Card } from "react-bootstrap";
import "./login.css";
import Footer from "../projectComponents/footer";
import Main from "../projectComponents/main";
import LoginModal from "./LoginModal";

export const UserContext = createContext();

class LoginSelector extends Component {
  state = {
    email: "",
    password: "",
    loginType: "User",
    isLoggedIn: false,
    showLogin: false,
    errorMessage: "",
    user: null,
    emailError: "",
    passwordError: "",
  };

  handleLoginTypeSelect = (type) => {
    this.setState({
      loginType: type,
      email: "",
      password: "",
      errorMessage: "",
      emailError: "",
      passwordError: "",
    });
  };


  
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });


  //Handle Login Request
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, loginType } = this.state;

    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required.";
    }
    if (!email.includes("@gmail.com")) {
      emailError = "Invalid Email ID.";
    }

    if (!password) {
      passwordError = "Password is required.";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return;
    }

    this.setState({ emailError: "", passwordError: "" });

    const url =
      loginType === "Admin"
        ? "http://localhost:8080/userdetails/adminlogin"
        : "http://localhost:8080/userdetails/userlogin";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) =>
        res.ok ? res.json() : res.text().then((msg) => Promise.reject(msg))
      )
      .then((data) => {
        if (data.adminId || data.userId) {
          this.setState({
            isLoggedIn: true,
            user: data,
          });
        } else {
          this.setState({ errorMessage: "Invalid credentials" });
        }
      })
      .catch((errorMessage) => {
        this.setState({
          passwordError: errorMessage,
          errorMessage: "",
        });
      });
  };

  //Show LoginModel Component
  toggleLogin = () => this.setState({ showLogin: !this.state.showLogin });

  render() {
    const {
      email,
      password,
      loginType,
      showLogin,
      errorMessage,
      isLoggedIn,
      user,
      emailError,
      passwordError,
    } = this.state;

    if (isLoggedIn) {
      return (
        <UserContext.Provider value={user}>
          <Main />
        </UserContext.Provider>
      );
    }

    return (
      <div className={`login-selector ${showLogin ? "blurred" : ""}`}>
        {/* Navbar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Diet Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
                <Button variant="outline-light" onClick={this.toggleLogin}>
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Section */}
        <Container
          fluid
          className="hero-section text-center p-5"
          style={{ backgroundColor: "#f0f8ff", color: "#333" }} 
        >
          <h1>Welcome to Your Personal Diet Tracker</h1>
          <p>
            Track your meals, monitor your diet, and achieve your health goals.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </Container>

        {/* Features Section */}
        <Container
          fluid
          className="text-center py-5 features-section"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h2 style={{ color: "#343a40" }}>Our Features</h2>
          <div className="d-flex justify-content-around flex-wrap">
            <Card
              className="m-2 p-3 feature-card"
              style={{ borderColor: "#007bff", borderWidth: "2px" }}
            >
              <Card.Title>Track Meals</Card.Title>
              <Card.Text>
                Log your meals and monitor nutrition effortlessly.
              </Card.Text>
            </Card>
            <Card
              className="m-2 p-3 feature-card"
              style={{ borderColor: "#28a745", borderWidth: "2px" }}
            >
              <Card.Title>Set Goals</Card.Title>
              <Card.Text>
                Define and track your personalized dietary goals.
              </Card.Text>
            </Card>
            <Card
              className="m-2 p-3 feature-card"
              style={{ borderColor: "#17a2b8", borderWidth: "2px" }}
            >
              <Card.Title>Analyze Nutrition</Card.Title>
              <Card.Text>
                Get insights on protein, carbs, and vitamins intake.
              </Card.Text>
            </Card>
            <Card
              className="m-2 p-3 feature-card"
              style={{ borderColor: "#ffc107", borderWidth: "2px" }}
            >
              <Card.Title>Meal Reminders</Card.Title>
              <Card.Text>
                Never miss a meal with customizable reminders.
              </Card.Text>
            </Card>
            <Card
              className="m-2 p-3 feature-card"
              style={{ borderColor: "#dc3545", borderWidth: "2px" }}
            >
              <Card.Title>Progress Reports</Card.Title>
              <Card.Text>
                Visualize your progress with detailed analytics.
              </Card.Text>
            </Card>
          </div>
        </Container>

        {/* Call-to-Action Section */}
        <Container fluid className="cta-section text-center py-5">
          <h2>Start Your Health Journey Today!</h2>
          <Button variant="dark" size="lg" className="mt-3">
            Sign Up Now
          </Button>
        </Container>

        {/* Testimonials Section */}
        <Container
          fluid
          className="testimonials-section text-center py-5"
          style={{ backgroundColor: "#e0f7fa", color: "#00796b" }}
        >
          <h2>What Our Users Say</h2>
          <div className="d-flex justify-content-around flex-wrap">
            <Card
              className="m-2 p-3 testimonial-card"
              style={{ borderColor: "#17a2b8", borderWidth: "2px" }}
            >
              <Card.Text>
                "This app helped me track my meals and stay fit. Highly
                recommend!"
              </Card.Text>
              <Card.Footer>- Alex Johnson</Card.Footer>
            </Card>
            <Card
              className="m-2 p-3 testimonial-card"
              style={{ borderColor: "#ffc107", borderWidth: "2px" }}
            >
              <Card.Text>
                "A must-have tool for anyone serious about their diet!"
              </Card.Text>
              <Card.Footer>- Jamie Lee</Card.Footer>
            </Card>
            <Card
              className="m-2 p-3 testimonial-card"
              style={{ borderColor: "#dc3545", borderWidth: "2px" }}
            >
              <Card.Text>
                "The reminders feature has been a game changer for my busy
                schedule."
              </Card.Text>
              <Card.Footer>- Chris Martin</Card.Footer>
            </Card>
            <Card
              className="m-2 p-3 testimonial-card"
              style={{ borderColor: "#28a745", borderWidth: "2px" }}
            >
              <Card.Text>
                "The progress reports keep me motivated to achieve my goals."
              </Card.Text>
              <Card.Footer>- Taylor Smith</Card.Footer>
            </Card>
          </div>
        </Container>

        {/* Login Modal */}
        <LoginModal
          loginType={loginType}
          email={email}
          password={password}
          showLogin={showLogin}
          emailError={emailError}
          passwordError={passwordError}
          errorMessage={errorMessage}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          toggleLogin={this.toggleLogin}
          handleLoginTypeSelect={this.handleLoginTypeSelect}
        />

        {/* Footer */}
        <footer className="footer bg-dark text-white text-center py-3">
          <Footer />
        </footer>
      </div>
    );
  }
}

export default LoginSelector;

///======================

