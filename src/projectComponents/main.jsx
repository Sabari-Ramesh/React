import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import Footer from "./footer";
import Center from "./Center";
import "./main.css";

class Main extends Component {
  render() {
    return (
      <Container fluid style={{ backgroundColor: "	#ffdbdc" }}>
        <NavBar />
        {/* userName={user?.userName || user?.username} */}
        <Center />
        {/* user={user} */}
        <Footer />
      </Container>
    );
  }
}

export default Main;
