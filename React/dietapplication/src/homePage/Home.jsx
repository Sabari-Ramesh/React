// src/components/Home.js
import React from 'react';
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
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
                onClick={() => navigate('/login')} // Navigate to LoginSelector
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
        <p>Track your meals, monitor your calorie intake, and achieve your health goals.</p>
        <Button variant="primary" size="lg" href="#get-started">
          Get Started
        </Button>
      </Container>

      {/* Features Section */}
      <Container className="features-section py-5">
        <h2 className="text-center mb-4">Features</h2>
        <Row>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <Card.Title>Track Your Meals</Card.Title>
                <Card.Text>Record what you eat and monitor your daily calorie intake.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <Card.Title>Set Goals</Card.Title>
                <Card.Text>Define your dietary goals and track your progress over time.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card text-center">
              <Card.Body>
                <Card.Title>Analyze Nutrients</Card.Title>
                <Card.Text>Get insights into your protein, carb, and vitamin intake.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
