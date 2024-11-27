//LoginSelector.js

// import React, { Component } from "react";
// import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
// import Main from "../projectComponents/main";
// import "./login.css";

// class LoginSelector extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       loginType: "User",
//       isLoggedIn: false,
//       user: null,
//       errorMessage: "",
//     };
//   }

//   handleLoginTypeSelect = (type) => {
//     this.setState({
//       loginType: type,
//       email: "",
//       password: "",
//       errorMessage: "",
//     });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password, loginType } = this.state;

//     const requestBody = { email, password };
//     const url =
//       loginType === "Admin"
//         ? "http://localhost:8080/userdetails/adminlogin"
//         : "http://localhost:8080/userdetails/userlogin";

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Login failed");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && (data.adminId || data.userId)) {
//           this.setState({ isLoggedIn: true, user: data });
//         } else {
//           this.setState({ errorMessage: "Invalid credentials" });
//         }
//       })
//       .catch((error) => {
//         console.error("Error during login:", error);
//         this.setState({ errorMessage: "Login failed, please try again." });
//       });
//   };

//   render() {
//     const { email, password, isLoggedIn, errorMessage, user, loginType } = this.state;

//     if (isLoggedIn) {
//       return <Main user={user} />;
//     }

//     return (
//       <Container
//         fluid
//         className="d-flex justify-content-center align-items-center"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #e3f2fd, #90caf9)",
//         }}
//       >
//         <Row className="w-100 justify-content-center">
//           <Col xs={12} md={6} lg={4}>
//             <Card className="shadow-lg p-4 rounded-4" style={{ borderRadius: "1rem" }}>
//               <Card.Body>
//                 <Row className="text-center mb-4">
//                   <Col>
//                     <Button
//                       variant={loginType === "Admin" ? "primary" : "outline-primary"}
//                       onClick={() => this.handleLoginTypeSelect("Admin")}
//                       className="w-100 py-2 mb-2"
//                       style={{ fontWeight: "bold", borderRadius: "1rem" }}
//                     >
//                       Admin Login
//                     </Button>
//                   </Col>
//                   <Col>
//                     <Button
//                       variant={loginType === "User" ? "primary" : "outline-primary"}
//                       onClick={() => this.handleLoginTypeSelect("User")}
//                       className="w-100 py-2 mb-2"
//                       style={{ fontWeight: "bold", borderRadius: "1rem" }}
//                     >
//                       User Login
//                     </Button>
//                   </Col>
//                 </Row>
//                 <h3 className="text-center mb-4" style={{ color: "#1976d2" }}>
//                   {loginType} Login
//                 </h3>
//                 {errorMessage && (
//                   <div className="text-danger mt-3 text-center">{errorMessage}</div>
//                 )}
//                 <Form onSubmit={this.handleSubmit}>
//                   <Form.Group controlId="email" className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       name="email"
//                       value={email}
//                       onChange={this.handleChange}
//                       required
//                       className="rounded-pill"
//                       style={{ padding: "0.75rem", borderColor: "#1976d2" }}
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="password" className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter password"
//                       name="password"
//                       value={password}
//                       onChange={this.handleChange}
//                       required
//                       className="rounded-pill"
//                       style={{ padding: "0.75rem", borderColor: "#1976d2" }}
//                     />
//                   </Form.Group>
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="w-100 rounded-pill"
//                     style={{ padding: "0.75rem" }}
//                   >
//                     Login
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default LoginSelector;

//---------------------------------------------------------------------------------------------------

//React Context

// import React, { Component, createContext } from "react";
// import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
// import Main from "../projectComponents/main";
// import "./login.css";

// // Create UserContext
// export const UserContext = createContext();

// class LoginSelector extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       loginType: "User",
//       isLoggedIn: false,
//       user: null,
//       errorMessage: "",
//     };
//   }

//   handleLoginTypeSelect = (type) => {
//     this.setState({
//       loginType: type,
//       email: "",
//       password: "",
//       errorMessage: "",
//     });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password, loginType } = this.state;

//     const requestBody = { email, password };
//     const url =
//       loginType === "Admin"
//         ? "http://localhost:8080/userdetails/adminlogin"
//         : "http://localhost:8080/userdetails/userlogin";

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Login failed");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && (data.adminId || data.userId)) {
//           this.setState({ isLoggedIn: true, user: data });
//         } else {
//           this.setState({ errorMessage: "Invalid credentials" });
//         }
//       })
//       .catch((error) => {
//         console.error("Error during login:", error);
//         this.setState({ errorMessage: "Login failed, please try again." });
//       });
//   };

//   render() {
//     const { email, password, isLoggedIn, errorMessage, user, loginType } =
//       this.state;

//     if (isLoggedIn) {
//       return (
//         <UserContext.Provider value={user}>
//           <Main />
//         </UserContext.Provider>
//       );
//     }

//     return (
//       <Container
//         fluid
//         className="d-flex justify-content-center align-items-center"
//         style={{
//           minHeight: "100vh",
//           background: "linear-gradient(135deg, #e3f2fd, #90caf9)",
//         }}
//       >
//         <Row className="w-100 justify-content-center">
//           <Col xs={12} md={6} lg={4}>
//             <Card
//               className="shadow-lg p-4 rounded-4"
//               style={{ borderRadius: "1rem" }}
//             >
//               <Card.Body>
//                 <Row className="text-center mb-4">
//                   <Col>
//                     <Button
//                       variant={
//                         loginType === "Admin" ? "primary" : "outline-primary"
//                       }
//                       onClick={() => this.handleLoginTypeSelect("Admin")}
//                       className="w-100 py-2 mb-2"
//                       style={{ fontWeight: "bold", borderRadius: "1rem" }}
//                     >
//                       Admin Login
//                     </Button>
//                   </Col>
//                   <Col>
//                     <Button
//                       variant={
//                         loginType === "User" ? "primary" : "outline-primary"
//                       }
//                       onClick={() => this.handleLoginTypeSelect("User")}
//                       className="w-100 py-2 mb-2"
//                       style={{ fontWeight: "bold", borderRadius: "1rem" }}
//                     >
//                       User Login
//                     </Button>
//                   </Col>
//                 </Row>
//                 <h3 className="text-center mb-4" style={{ color: "#1976d2" }}>
//                   {loginType} Login
//                 </h3>
//                 {errorMessage && (
//                   <div className="text-danger mt-3 text-center">
//                     {errorMessage}
//                   </div>
//                 )}
//                 <Form onSubmit={this.handleSubmit}>
//                   <Form.Group controlId="email" className="mb-3">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       placeholder="Enter email"
//                       name="email"
//                       value={email}
//                       onChange={this.handleChange}
//                       required
//                       className="rounded-pill"
//                       style={{ padding: "0.75rem", borderColor: "#1976d2" }}
//                     />
//                   </Form.Group>
//                   <Form.Group controlId="password" className="mb-3">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                       type="password"
//                       placeholder="Enter password"
//                       name="password"
//                       value={password}
//                       onChange={this.handleChange}
//                       required
//                       className="rounded-pill"
//                       style={{ padding: "0.75rem", borderColor: "#1976d2" }}
//                     />
//                   </Form.Group>
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     className="w-100 rounded-pill"
//                     style={{ padding: "0.75rem" }}
//                   >
//                     Login
//                   </Button>
//                 </Form>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default LoginSelector;

//-----------------------------------------------------------------------------import React, { Component, createContext } from "react";

// src/components/LoginSelector.js
// import React, { Component } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Card,
//   Navbar,
//   Nav,
// } from "react-bootstrap";
// import Main from "../projectComponents/main";
// import "./login.css";

// export const UserContext = React.createContext();

// class LoginSelector extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       loginType: "User",
//       isLoggedIn: false,
//       user: null,
//       showLogin: false,
//       errorMessage: "",
//     };
//   }

//   handleLoginTypeSelect = (type) => {
//     this.setState({
//       loginType: type,
//       email: "",
//       password: "",
//       errorMessage: "",
//     });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password, loginType } = this.state;

//     const requestBody = { email, password };
//     const url =
//       loginType === "Admin"
//         ? "http://localhost:8080/userdetails/adminlogin"
//         : "http://localhost:8080/userdetails/userlogin";

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Login failed");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && (data.adminId || data.userId)) {
//           this.setState({ isLoggedIn: true, user: data });
//         } else {
//           this.setState({ errorMessage: "Invalid credentials" });
//         }
//       })
//       .catch((error) => {
//         console.error("Error during login:", error);
//         this.setState({ errorMessage: "Login failed, please try again." });
//       });
//   };

//   toggleLogin = () => {
//     this.setState({ showLogin: !this.state.showLogin });
//   };

//   render() {
//     const {
//       email,
//       password,
//       isLoggedIn,
//       errorMessage,
//       user,
//       loginType,
//       showLogin,
//     } = this.state;

//     if (isLoggedIn) {
//       return (
//         <UserContext.Provider value={user}>
//           <Main />
//         </UserContext.Provider>
//       );
//     }

//     return (
//       <div className={`login-selector ${showLogin ? "blurred" : ""}`}>
//         {/* Navbar */}
//         <Navbar bg="dark" variant="dark" expand="lg">
//           <Container>
//             <Navbar.Brand href="#home">Diet Tracker</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="ms-auto">
//                 <Nav.Link href="#features">Features</Nav.Link>
//                 <Nav.Link href="#about">About</Nav.Link>
//                 <Nav.Link href="#contact">Contact</Nav.Link>
//                 <Button
//                   variant="outline-light"
//                   className="ms-3"
//                   onClick={this.toggleLogin} // Show login form
//                 >
//                   Login
//                 </Button>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>

//         {/* Hero Section */}
//         <Container fluid className="hero-section text-center p-5">
//           <h1>Welcome to Your Personal Diet Tracker</h1>
//           <p>
//             Track your meals, monitor your calorie intake, and achieve your
//             health goals.
//           </p>
//           <Button variant="primary" size="lg" href="#get-started">
//             Get Started
//           </Button>
//         </Container>

//         {/* Features Section */}
//         <Container className="features-section py-5">
//           <h2 className="text-center mb-4">Features</h2>
//           <Row>
//             <Col md={4}>
//               <Card className="feature-card text-center">
//                 <Card.Body>
//                   <Card.Title>Track Your Meals</Card.Title>
//                   <Card.Text>
//                     Record what you eat and monitor your daily calorie intake.
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="feature-card text-center">
//                 <Card.Body>
//                   <Card.Title>Set Goals</Card.Title>
//                   <Card.Text>
//                     Define your dietary goals and track your progress over time.
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="feature-card text-center">
//                 <Card.Body>
//                   <Card.Title>Analyze Nutrients</Card.Title>
//                   <Card.Text>
//                     Get insights into your protein, carb, and vitamin intake.
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>

//         {/* Show Login Form with Blur Effect */}
//         {showLogin && (
//           <div className="login-overlay">
//             <div className="login-form-container">
//               <Button
//                 variant="secondary"
//                 onClick={this.toggleLogin}
//                 className="close-btn"
//               >
//                 Close
//               </Button>
//               <h3>{loginType} Login</h3>
//               {errorMessage && (
//                 <div className="text-danger mt-3 text-center">
//                   {errorMessage}
//                 </div>
//               )}
//               <form onSubmit={this.handleSubmit}>
//                 <input
//                   type="email"
//                   placeholder="Enter email"
//                   name="email"
//                   value={email}
//                   onChange={this.handleChange}
//                   className="form-control mb-3"
//                 />
//                 <input
//                   type="password"
//                   placeholder="Enter password"
//                   name="password"
//                   value={password}
//                   onChange={this.handleChange}
//                   className="form-control mb-3"
//                 />
//                 <Button variant="primary" type="submit" className="w-100">
//                   Login
//                 </Button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default LoginSelector;  ------------------------------------>Good and small Correction ---->1

//-------------------------------------------------------------------------------------------------------------------------------

// src/components/LoginSelector.js

// import React, { Component } from "react";
// import {
//   Container,
//   Row,
//   Form,
//   Col,
//   Button,
//   Card,
//   Navbar,
//   Nav,
// } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa"; // Import the X icon from react-icons
// import Main from "../projectComponents/main";
// import "./login.css";

// export const UserContext = React.createContext();

// class LoginSelector extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       loginType: "User", // Default to User login
//       isLoggedIn: false,
//       user: null,
//       showLogin: false,
//       errorMessage: "",
//     };
//   }

//   handleLoginTypeSelect = (type) => {
//     this.setState({
//       loginType: type,
//       email: "",
//       password: "",
//       errorMessage: "",
//     });
//   };

//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { email, password, loginType } = this.state;

//     const requestBody = { email, password };
//     const url =
//       loginType === "Admin"
//         ? "http://localhost:8080/userdetails/adminlogin"
//         : "http://localhost:8080/userdetails/userlogin";

//     fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Login failed");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && (data.adminId || data.userId)) {
//           this.setState({ isLoggedIn: true, user: data });
//         } else {
//           this.setState({ errorMessage: "Invalid credentials" });
//         }
//       })
//       .catch((error) => {
//         console.error("Error during login:", error);
//         this.setState({ errorMessage: "Login failed, please try again." });
//       });
//   };

//   toggleLogin = () => {
//     this.setState({ showLogin: !this.state.showLogin });
//   };

//   render() {
//     const {
//       email,
//       password,
//       isLoggedIn,
//       errorMessage,
//       user,
//       loginType,
//       showLogin,
//     } = this.state;

//     if (isLoggedIn) {
//       return (
//         <UserContext.Provider value={user}>
//           <Main />
//         </UserContext.Provider>
//       );
//     }

//     return (
//       <div className={`login-selector ${showLogin ? "blurred" : ""}`}>
//         {/* Navbar */}
//         <Navbar bg="dark" variant="dark" expand="lg">
//           <Container>
//             <Navbar.Brand href="#home">Diet Tracker</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="ms-auto">
//                 <Nav.Link href="#features">Features</Nav.Link>
//                 <Nav.Link href="#about">About</Nav.Link>
//                 <Nav.Link href="#contact">Contact</Nav.Link>
//                 <Button
//                   variant="outline-light"
//                   className="ms-3"
//                   onClick={this.toggleLogin} // Show login form
//                 >
//                   Login
//                 </Button>
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>

//         {/* Hero Section */}
//         <Container fluid className="hero-section text-center p-5">
//           <h1>Welcome to Your Personal Diet Tracker</h1>
//           <p>
//             Track your meals, monitor your calorie intake, and achieve your
//             health goals.
//           </p>
//           <Button variant="primary" size="lg" href="#get-started">
//             Get Started
//           </Button>
//         </Container>

//         {/* Features Section */}
//         <Container className="features-section py-5">
//           <h2 className="text-center mb-4">Features</h2>
//           <Row>
//             <Col md={4}>
//               <Card className="feature-card text-center">
//                 <Card.Body>
//                   <Card.Title>Track Your Meals</Card.Title>
//                   <Card.Text>
//                     Record what you eat and monitor your daily calorie intake.
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="feature-card text-center">
//                 <Card.Body>
//                   <Card.Title>Set Goals</Card.Title>
//                   <Card.Text>
//                     Define your dietary goals and track your progress over time.
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4}>
//               <Card className="feature-card text-center">
//                 <Card.Body>
//                   <Card.Title>Analyze Nutrients</Card.Title>
//                   <Card.Text>
//                     Get insights into your protein, carb, and vitamin intake.
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>

//         {/* Show Login Form with Blur Effect */}
//         {showLogin && (
//           <div className="login-overlay">
//             <div className="login-form-container">
//               {/* Close Button with X Icon */}
//               <Button
//                 variant="secondary"
//                 onClick={this.toggleLogin}
//                 className="close-btn"
//               >
//                 <FaTimes /> {/* X Icon from react-icons */}
//               </Button>
//               <h3>{loginType} Login</h3>
//               {/* Add Toggle for Login Type */}
//               <div className="login-type-toggle">
//                 <Button
//                   variant={loginType === "User" ? "primary" : "secondary"}
//                   onClick={() => this.handleLoginTypeSelect("User")}
//                 >
//                   User Login
//                 </Button>
//                 <Button
//                   variant={loginType === "Admin" ? "primary" : "secondary"}
//                   onClick={() => this.handleLoginTypeSelect("Admin")}
//                 >
//                   Admin Login
//                 </Button>
//               </div>
//               {errorMessage && (
//                 <div className="text-danger mt-3 text-center">
//                   {errorMessage}
//                 </div>
//               )}
//               <form onSubmit={this.handleSubmit}>
//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     name="email"
//                     value={email}
//                     onChange={this.handleChange} // Updated to use handleChange
//                     className="mb-3"
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter password"
//                     name="password"
//                     value={password}
//                     onChange={this.handleChange} // Updated to use handleChange
//                     className="mb-3"
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100">
//                   Login
//                 </Button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default LoginSelector;



import React, { Component } from "react";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Card,
  Navbar,
  Nav,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa"; // Import the X icon from react-icons
import Main from "../projectComponents/main";
import "./login.css";

export const UserContext = React.createContext();

class LoginSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginType: "User", // Default to User login
      isLoggedIn: false,
      user: null,
      showLogin: false,
      errorMessage: "",
    };
  }

  handleLoginTypeSelect = (type) => {
    this.setState({
      loginType: type,
      email: "",
      password: "",
      errorMessage: "",
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, loginType } = this.state;

    const requestBody = { email, password };
    const url =
      loginType === "Admin"
        ? "http://localhost:8080/userdetails/adminlogin"
        : "http://localhost:8080/userdetails/userlogin";

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      })
      .then((data) => {
        if (data && (data.adminId || data.userId)) {
          this.setState({ isLoggedIn: true, user: data });
        } else {
          this.setState({ errorMessage: "Invalid credentials" });
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        this.setState({ errorMessage: "Login failed, please try again." });
      });
  };

  toggleLogin = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  render() {
    const {
      email,
      password,
      isLoggedIn,
      errorMessage,
      user,
      loginType,
      showLogin,
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
                <Button
                  variant="outline-light"
                  className="ms-3"
                  onClick={this.toggleLogin} // Show login form
                >
                  Login
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Hero Section */}
        <Container fluid className="hero-section text-center p-5">
          <h1>Welcome to Your Personal Diet Tracker</h1>
          <p>
            Track your meals, monitor your calorie intake, and achieve your
            health goals.
          </p>
          <Button variant="primary" size="lg" href="#get-started">
            Get Started
          </Button>
        </Container>

        {/* Features Section */}
        <Container fluid className="features-section py-5">
          <h2 className="text-center mb-4">Features</h2>
          <Row>
            <Col md={4}>
              <Card className="feature-card text-center">
                <Card.Body>
                  <Card.Title>Track Your Meals</Card.Title>
                  <Card.Text>
                    Record what you eat and monitor your daily calorie intake.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card text-center">
                <Card.Body>
                  <Card.Title>Set Goals</Card.Title>
                  <Card.Text>
                    Define your dietary goals and track your progress over time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="feature-card text-center">
                <Card.Body>
                  <Card.Title>Analyze Nutrients</Card.Title>
                  <Card.Text>
                    Get insights into your protein, carb, and vitamin intake.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Testimonials Section */}
        <Container fluid className="testimonials-section py-5">
          <h2 className="text-center mb-4">Testimonials</h2>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card text-center">
                <Card.Body>
                  <Card.Text>
                    "The Diet Tracker has helped me stay on top of my calorie
                    goals. Highly recommended!"
                  </Card.Text>
                  <footer className="blockquote-footer">John Doe</footer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card text-center">
                <Card.Body>
                  <Card.Text>
                    "Thanks to the tracking features, I’ve been able to stick to
                    my diet plan and see real progress."
                  </Card.Text>
                  <footer className="blockquote-footer">Jane Smith</footer>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card text-center">
                <Card.Body>
                  <Card.Text>
                    "This app made my fitness journey so much easier to manage
                    and stay consistent."
                  </Card.Text>
                  <footer className="blockquote-footer">Alice Johnson</footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Show Login Form with Blur Effect */}
        {showLogin && (
          <div className="login-overlay">
            <div className="login-form-container">
              {/* Close Button with X Icon */}
              <Button
                variant="secondary"
                onClick={this.toggleLogin}
                className="close-btn"
              >
                <FaTimes /> {/* X Icon from react-icons */}
              </Button>
              <h3 className="text-center">{loginType} Login</h3>
              {/* Add Toggle for Login Type */}
              <div className="login-type-toggle">
                <Button
                  variant={loginType === "User" ? "primary" : "outline-primary"}
                  onClick={() => this.handleLoginTypeSelect("User")}
                >
                  User Login
                </Button>
                <Button
                  variant={loginType === "Admin" ? "primary" : "outline-primary"}
                  onClick={() => this.handleLoginTypeSelect("Admin")}
                >
                  Admin Login
                </Button>
              </div>
              {errorMessage && (
                <div className="text-danger mt-3 text-center">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    className="mb-3"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoginSelector;
