import React from "react";
import Container from "react-bootstrap/Container";
import { NavBar, Center, Footer } from "./NavBar";
import "./main.css"
function Main() {
  return (
    <Container fluid>
      <NavBar />
      <Center />
      <Footer />
    </Container>
  );
}

export default Main;
