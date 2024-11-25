// import React, { Component } from "react";
// import { Row, Col, Container } from "react-bootstrap";
// import "./main.css";
// import logo from "./applicationlogo.png";

// // NAVBAR CONTENT

// class NavBar extends Component {
//   render() {
//     const {username}=this.props;
//     return (
//       <Container fluid>
//         <nav className="text-white" style={{ backgroundColor: "#f3a683" }}>
//           <Row className="text-center" style={{ height: "50px" }}>
//             <Col
//               className="d-flex align-items-center"
//               style={{ backgroundColor: "#f3a683" }}
//               xs={3}
//             >
//               <img
//                 src={logo}
//                 alt="LOGO"
//                 style={{
//                   height: "70px",
//                   width: "auto",
//                   marginTop: "-10px",
//                   marginLeft: "20px",
//                 }}
//               />
//             </Col>

//             <Col>
//               <p className="text-center fs-5 fw-bold">Diet Tracker Application</p>
//               <p className="text-end fs-5 fw-bold">Welcome {username} !!!</p>
//             </Col>
//           </Row>
//         </nav>
//       </Container>
//     );
//   }
// }

// export default NavBar;

import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./main.css";
import logo from "./applicationlogo.png";

// NAVBAR CONTENT
class NavBar extends Component {
  render() {
    const { userName } = this.props;

    return (
      <Container fluid>
        <nav className="text-white" style={{ backgroundColor: "#8b57ea" }}>
          <Row className="align-items-center" style={{ height: "70px" }}>
            {/* Logo Section */}
            <Col xs={3}>
              <img
                src={logo}
                alt="LOGO"
                style={{
                  height: "60px",
                  width: "auto",
                  marginLeft: "20px",
                }}
              />
            </Col>

            {/* Title Section */}
            <Col className="text-center">
              <p className="fs-5 fw-bold m-0">Diet Tracker Application</p>
            </Col>

            {/* Username Section */}
            <Col xs={3} className="text-end pe-4">
              <p className="fs-6 fw-bold m-0">Welcome, {userName}!</p>
            </Col>
          </Row>
        </nav>
      </Container>
    );
  }
}

export default NavBar;
