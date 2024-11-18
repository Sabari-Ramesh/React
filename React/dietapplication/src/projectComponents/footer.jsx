import React, { Component } from "react";
import Container from "react-bootstrap/Container";

class Footer extends Component {
  render() {
    return (
      <Container
        fluid
        className="text-white text-center py-3"
        style={{ background: "rgb(40, 42, 54)" }}
      >
        <p className="mb-0">Footer Content</p>
      </Container>
    );
  }
}

export default Footer;
