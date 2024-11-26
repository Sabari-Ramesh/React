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

import React, { Component, createContext } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import Main from "../projectComponents/main";
import "./login.css";

// Create UserContext 
export const UserContext = createContext();

class LoginSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginType: "User",
      isLoggedIn: false,
      user: null,
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

  render() {
    const { email, password, isLoggedIn, errorMessage, user, loginType } = this.state;

    if (isLoggedIn) {
      return (
        <UserContext.Provider value={user}>
          <Main />
        </UserContext.Provider>
      );
    }

    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e3f2fd, #90caf9)",
        }}
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg p-4 rounded-4" style={{ borderRadius: "1rem" }}>
              <Card.Body>
                <Row className="text-center mb-4">
                  <Col>
                    <Button
                      variant={loginType === "Admin" ? "primary" : "outline-primary"}
                      onClick={() => this.handleLoginTypeSelect("Admin")}
                      className="w-100 py-2 mb-2"
                      style={{ fontWeight: "bold", borderRadius: "1rem" }}
                    >
                      Admin Login
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant={loginType === "User" ? "primary" : "outline-primary"}
                      onClick={() => this.handleLoginTypeSelect("User")}
                      className="w-100 py-2 mb-2"
                      style={{ fontWeight: "bold", borderRadius: "1rem" }}
                    >
                      User Login
                    </Button>
                  </Col>
                </Row>
                <h3 className="text-center mb-4" style={{ color: "#1976d2" }}>
                  {loginType} Login
                </h3>
                {errorMessage && (
                  <div className="text-danger mt-3 text-center">{errorMessage}</div>
                )}
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      required
                      className="rounded-pill"
                      style={{ padding: "0.75rem", borderColor: "#1976d2" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                      required
                      className="rounded-pill"
                      style={{ padding: "0.75rem", borderColor: "#1976d2" }}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 rounded-pill"
                    style={{ padding: "0.75rem" }}
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginSelector;



