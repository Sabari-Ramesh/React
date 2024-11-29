import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import tender from "./images/coconut.jpg";
import broccoli from "./images/Broccoli.jpg";
import multivitamin from "./images/Multivitamins.jpg";
import protein from "./images/Protein Powder.jpg";
import spinach from "./images/Spinach.jpg";
import apple from "./images/apple.png";
import greenapple from "./images/images.jpg"
import "./Home.css"; 

class DietStore extends Component {
  state = {
    products: [
      {
        id: 1,
        name: "Apple",
        category: "Fruits",
        price: "$2",
        image: greenapple,
        benefits: "Rich in fiber and vitamins.",
      },
      {
        id: 2,
        name: "Broccoli",
        category: "Vegetables",
        price: "$3",
        image: broccoli,
        benefits: "High in vitamins and antioxidants.",
      },
      {
        id: 3,
        name: "Protein Powder",
        category: "Supplements",
        price: "$25",
        image: protein,
        benefits: "Supports muscle growth and recovery.",
      },
      {
        id: 4,
        name: "Spinach",
        category: "Vegetables",
        price: "$2",
        image: spinach,
        benefits: "Rich in iron and fiber.",
      },
      {
        id: 5,
        name: "Multivitamins",
        category: "Supplements",
        price: "$15",
        image: multivitamin,
        benefits: "Boosts immunity and energy.",
      },
      {
        id: 6,
        name: "Tender Coconut",
        category: "Fruits",
        price: "$1.5",
        image: tender,
        benefits: "Hydrates and replenishes electrolytes.",
      },
    ],
    cart: [],
  };

  render() {
    const { products, cart } = this.state;

    return (
      <Container fluid>
        <Row>
          {/* Products Section */}
          <Col xs={12} className="p-4">
            <h4>
              All Products <Badge bg="info">{products.length}</Badge>
            </h4>
            <Row>
              {products.map((product) => (
                <Col xs={12} md={6} lg={4} className="mb-4" key={product.id}>
                  <Card className="product-card">
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.benefits}</Card.Text>
                      <h5>{product.price}</h5>
                      <Button variant="success">Add to Cart</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DietStore;
