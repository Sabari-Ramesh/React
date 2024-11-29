// import React, { Component } from "react";
// import { Form, Button } from "react-bootstrap";
// import { FaTimes } from "react-icons/fa";

// class LoginModal extends Component {
//   render() {
//     const {
//       loginType,
//       email,
//       password,
//       showLogin,
//       emailError,
//       passwordError,
//       errorMessage,
//       handleChange,
//       handleSubmit,
//       toggleLogin,
//       handleLoginTypeSelect,
//     } = this.props;

//     if (!showLogin) return null;

//     return (
//       <div className="login-overlay">
//         <div className="login-form-container">
//           <Button
//             variant="secondary"
//             onClick={toggleLogin}
//             className="close-btn"
//           >
//             <FaTimes />
//           </Button>
//           <h3 className="text-center">{loginType} Login</h3>
//           <div className="mt-3 d-flex justify-content-center gap-3">
//             <Button
//               variant={loginType === "User" ? "primary" : "outline-primary"}
//               onClick={() => handleLoginTypeSelect("User")}
//               className="me-2"
//             >
//               User Login
//             </Button>
//             <Button
//               variant={loginType === "Admin" ? "primary" : "outline-primary"}
//               onClick={() => handleLoginTypeSelect("Admin")}
//             >
//               Admin Login
//             </Button>
//           </div>

//           {errorMessage && (
//             <div className="text-danger mt-3">{errorMessage}</div>
//           )}

//           <Form onSubmit={handleSubmit} className="mt-3">
//             <Form.Group controlId="formEmail" className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="email"
//                 value={email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//               />
//               {emailError && <div className="text-danger">{emailError}</div>}
//             </Form.Group>

//             <Form.Group controlId="formPassword" className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
//               />
//               {passwordError && <div className="text-danger">{passwordError}</div>}
//             </Form.Group>

//             <Button type="submit" className="w-100">
//               Login
//             </Button>
//           </Form>
//         </div>
//       </div>
//     );
//   }
// }

// export default LoginModal;

///================================================================================

import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

class LoginModal extends Component {
  state = {
    isRegistering: false,
    registerData: {
      userName: "",
      dob: "",
      email: "",
      mobileNumber: "",
      password: "",
      gender: "",
      city: "",
    },
    registerErrors: {},
    successMessage: "",
  };

  handleRegisterChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      registerData: {
        ...prevState.registerData,
        [name]: value,
      },
    }));
  };

  validateRegisterForm = () => {
    const { userName, dob, email, mobileNumber, password, gender, city } =
      this.state.registerData;
    const errors = {};

    if (!userName) errors.userName = "User Name is required.";
    if (!/^[a-zA-Z\s]+$/.test(userName)) {
      errors.userName = "User Name can only contain letters and spaces.";
    }
    if (!dob) {
      errors.dob = "Date of Birth is required.";
    } else {
      const currentDate = new Date();
      const dobDate = new Date(dob);
      const ageDiff = currentDate.getFullYear() - dobDate.getFullYear();
      const ageAdjustment =
        currentDate.getMonth() < dobDate.getMonth() ||
        (currentDate.getMonth() === dobDate.getMonth() &&
          currentDate.getDate() < dobDate.getDate());
      const actualAge = ageDiff - (ageAdjustment ? 1 : 0);

      if (dobDate > currentDate) {
        errors.dob = "Date of Birth cannot be in the future.";
      } else if (actualAge < 18) {
        errors.dob = "You must be at least 18 years old.";
      }
    }
    if (!email || !email.includes("@gmail.com"))
      errors.email = "Valid Email is required.";
    if (!mobileNumber || mobileNumber.length < 10 || mobileNumber.length>10)
      errors.mobileNumber = "Valid Mobile Number is required.";
    if (!password || password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    if (!gender) errors.gender = "Gender is required.";
    if (!city) errors.city = "City is required.";

    return errors;
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateRegisterForm();
    if (Object.keys(errors).length > 0) {
      this.setState({ registerErrors: errors });
      return;
    }

    fetch("http://localhost:8080/userdetails/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.registerData),
    })
      .then(async (res) => {
        if (res.ok) {
          this.setState({
            isRegistering: false,
            successMessage: "Registration successful!",
            showNotification: true,
            registerData: {
              // Reset form fields
              userName: "",
              dob: "",
              email: "",
              mobileNumber: "",
              password: "",
              gender: "",
              city: "",
            },
            registerErrors: {},
          });
          setTimeout(() => {
            this.setState({
              successMessage: "",
              showNotification: false,
            });
            // this.toggleRegister();
          }, 5000);

          //Optionally handle the form submission (if you need to trigger something else)
                   
        } else {
          const errorText = await res.text();
          throw new Error(errorText || "Registration failed.");
        }
      })
      .catch((err) => {
        this.setState({
          registerErrors: { general: err.message || "Registration failed." },
          showNotification: true, // Show error message
        });

        // Set a timeout to hide the notification after 5 seconds
        setTimeout(() => {
          this.setState({
            registerErrors: { general: "" },
            showNotification: false, // Hide error message after 5 seconds
          });
        }, 5000);
      });
  };

  toggleRegister = () => {
    this.setState((prevState) => ({ isRegistering: !prevState.isRegistering }));
  };

  render() {
    const {
      loginType,
      email,
      password,
      showLogin,
      emailError,
      passwordError,
      errorMessage,
      handleChange,
      handleSubmit,
      toggleLogin,
      handleLoginTypeSelect,
    } = this.props;

    const { isRegistering, registerData, registerErrors, successMessage } =
      this.state;

    if (!showLogin) return null;

    return (
      <div className="login-overlay">
        <div className="login-form-container" style={{ width: "500px" }}>
          <Button
            variant="secondary"
            onClick={toggleLogin}
            className="close-btn"
          >
            <FaTimes />
          </Button>
          <h3 className="text-center">
            {isRegistering ? "Register" : `${loginType} Login`}
          </h3>

          {/* Notification message container */}
          {(successMessage || registerErrors.general) && (
            <div
              className={`notification ${successMessage ? "success" : "error"}`}
            >
              {successMessage || registerErrors.general}
            </div>
          )}

          {!isRegistering ? (
            <>
              <div className="mt-3 d-flex justify-content-center gap-3">
                <Button
                  variant={loginType === "User" ? "primary" : "outline-primary"}
                  onClick={() => handleLoginTypeSelect("User")}
                  className="me-2"
                >
                  User Login
                </Button>
                <Button
                  variant={
                    loginType === "Admin" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleLoginTypeSelect("Admin")}
                >
                  Admin Login
                </Button>
              </div>

              {errorMessage && (
                <div className="text-danger mt-3">{errorMessage}</div>
              )}

              <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {emailError && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter password"
                  />
                  {passwordError && (
                    <div className="text-danger">{passwordError}</div>
                  )}
                </Form.Group>

                <Button type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              {loginType === "User" && (
                <div className="mt-3 text-center">
                  <small>
                    Don't have an account?{" "}
                    <Button variant="link" onClick={this.toggleRegister}>
                      Register Here
                    </Button>
                  </small>
                </div>
              )}
            </>
          ) : (
            <div>
              {/* Registration form JSX here */}
              <Form onSubmit={this.handleRegisterSubmit} className="mt-3">
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="userName">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter User Name"
                        name="userName"
                        value={registerData.userName}
                        onChange={this.handleRegisterChange}
                      />
                      {registerErrors.userName && (
                        <div className="text-danger">
                          {registerErrors.userName}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dob"
                        value={registerData.dob}
                        onChange={this.handleRegisterChange}
                      />
                      {registerErrors.dob && (
                        <div className="text-danger">{registerErrors.dob}</div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={registerData.email}
                        onChange={this.handleRegisterChange}
                      />
                      {registerErrors.email && (
                        <div className="text-danger">
                          {registerErrors.email}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="mobileNumber">
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Mobile Number"
                        name="mobileNumber"
                        value={registerData.mobileNumber}
                        onChange={this.handleRegisterChange}
                      />
                      {registerErrors.mobileNumber && (
                        <div className="text-danger">
                          {registerErrors.mobileNumber}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={registerData.password}
                        onChange={this.handleRegisterChange}
                      />
                      {registerErrors.password && (
                        <div className="text-danger">
                          {registerErrors.password}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        as="select"
                        name="gender"
                        value={registerData.gender}
                        onChange={this.handleRegisterChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Control>
                      {registerErrors.gender && (
                        <div className="text-danger">
                          {registerErrors.gender}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    name="city"
                    value={registerData.city}
                    onChange={this.handleRegisterChange}
                  >
                    <option value="">Select City</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Salem">Salem</option>
                    <option value="Trichy">Trichy</option>
                    <option value="Madurai">Madurai</option>
                    <option value="Coimbatore">Coimbatore</option>
                  </Form.Select>
                  {registerErrors.city && (
                    <div className="text-danger">{registerErrors.city}</div>
                  )}
                </Form.Group>

                <Button type="submit" className="w-100">
                  Register
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <small>
                  Already have an account?{" "}
                  <Button variant="link" onClick={this.toggleRegister}>
                    Login Here
                  </Button>
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default LoginModal;
