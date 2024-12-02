import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Social media icons
import { BsTelephoneFill, BsEnvelopeFill } from "react-icons/bs"; // Contact icons

class Footer extends Component {
  render() {
    return (
      <Container
        fluid
        className="text-white text-center py-3"
        style={{ background: "rgb(40, 42, 54)" }}
      >
        <Row>
          {/* About Us Section */}
          <Col sm={12} md={4} className="mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>
              We are a health-focused company committed to helping individuals
              track and manage their diet. Our goal is to provide users with an
              intuitive platform to stay on top of their nutritional needs.
            </p>
          </Col>

          {/* Social Media Section */}
          <Col sm={12} md={4} className="mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div>
              <a href="#" className="text-white mx-2">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white mx-2">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white mx-2">
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>

          {/* Contact Information Section */}
          <Col sm={12} md={4} className="mb-3 mb-md-0">
            <h5>Contact Us</h5>
            <div>
              <p><BsTelephoneFill size={20} className="mr-2" /> (123) 456-7890</p>
              <p><BsEnvelopeFill size={20} className="mr-2" /> support@diettracker.com</p>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom Section */}
        <Row>
          <Col sm={12}>
            <p className="mb-0">&copy; 2024 Diet Tracker. All Rights Reserved.</p>
            <p className="mb-0">
              <a href="/terms" className="text-white">Terms of Service</a> |{" "}
              <a href="/privacy" className="text-white">Privacy Policy</a>
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Footer;
