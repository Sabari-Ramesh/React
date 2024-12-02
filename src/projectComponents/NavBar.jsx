// import React, { Component } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import "./main.css";
// import logo from "./applicationlogo.png";

// // NAVBAR CONTENT
// export default class NavBar extends Component {
//   render() {
//     const { userName } = this.props;

//     return (
//       <Container fluid>
//         <nav
//           className="text-white"
//           style={{ backgroundColor: "#8b57ea", width: "201vh" }}
//         >
//           <Row className="align-items-center" style={{ height: "70px" }}>
//             {/* Logo Section */}
//             <Col xs={3}>
//               <img
//                 src={logo}
//                 alt="LOGO"
//                 style={{
//                   height: "60px",
//                   width: "auto",
//                   marginLeft: "20px",
//                 }}
//               />
//             </Col>

//             {/* Title Section */}
//             <Col className="text-center">
//               <p className="fs-5 fw-bold m-0">Diet Tracker Application</p>
//             </Col>

//             {/* Username Section */}
//             <Col xs={3} className="text-end pe-4">
//               <p className="fs-6 fw-bold m-0">Welcome, {userName}!</p>
//             </Col>
//           </Row>
//         </nav>
//       </Container>
//     );
//   }
// }

//React Context

// import React, { Component } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import { UserContext } from "../Login/LoginSelector"
// import "./main.css";
// import logo from "./applicationlogo.png";

// export default class NavBar extends Component {
//   static contextType = UserContext; // Set contextType to access UserContext

//   render() {
//     const { userName, username } = this.context || {};  // Destructure userName from context
//     const displayName = userName || username; // Use whichever is available

//     return (
//       <Container fluid>
//         <nav
//           className="text-white"
//           style={{ backgroundColor: "#8b57ea", width: "201vh" }}
//         >
//           <Row className="align-items-center" style={{ height: "70px" }}>
//             {/* Logo Section */}
//             <Col xs={3}>
//               <img
//                 src={logo}
//                 alt="LOGO"
//                 style={{
//                   height: "60px",
//                   width: "auto",
//                   marginLeft: "20px",
//                 }}
//               />
//             </Col>

//             {/* Title Section */}
//             <Col className="text-center">
//               <p className="fs-5 fw-bold m-0">Diet Tracker Application</p>
//             </Col>

//             {/* Username Section */}
//             <Col xs={3} className="text-end pe-4">
//               <p className="fs-6 fw-bold m-0">Welcome, {displayName}!</p>
//             </Col>
//           </Row>
//         </nav>
//       </Container>
//     );
//   }
// }

///====================================================================================

import React, { Component } from "react";
import { Row, Col, Container, Navbar } from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector";
//import {UserContext} from "../contexts/UserProvider "
import "./main.css";
import logo from "./applelogo.png";


export default class NavBar extends Component {
  static contextType = UserContext; // Set contextType to access UserContext

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
