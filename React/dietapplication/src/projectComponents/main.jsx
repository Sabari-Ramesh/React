import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import NavBar from "./NavBar";
import Footer from "./footer";
import Center from "./Center";
import "./main.css";

class Main extends Component {
  render() {
    const { user } = this.props;
    console.log("main");
    console.log(user);
    return (
      <Container fluid style={{ backgroundColor: "	#ffdbdc" }}>
        <NavBar userName={user?.userName} />
        <Center user={user} />
        <Footer />
      </Container>
    );
  }
}

export default Main;
