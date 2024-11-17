//

import React, { useState } from "react";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";

export function Insert() {
  const [mealData, setMealData] = useState({
    meal: null,
    mealDate: null,
    userid: null,
    foodName: null,
    quantity: null,
    calories: null,
    protein: null,
    carbs: null,
    vitamins: null,
  });

  const [errors, setErrors] = useState({
    meal: "",
    mealDate: "",
    userid: "",
    foodName: "",
    quantity: "",
    calories: "",
    protein: "",
    carbs: "",
    vitamins: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check for negative values and set an error message if negative
    if (
      (name === "quantity" ||
        name === "calories" ||
        name === "protein" ||
        name === "carbs" ||
        name === "vitamins") &&
      value < 0
    ) {
      setErrors({
        ...errors,
        [name]: "Value should not be negative",
      });
      return; // Don't update the state if the value is negative
    } else {
      setErrors({
        ...errors,
        [name]: "", // Clear error message if the input is valid
      });
    }

    // Update mealData state
    setMealData({
      ...mealData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate each field
    Object.keys(mealData).forEach((key) => {
      if (!mealData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", mealData);
      // Submit the form data to a server or handle it as needed
    }
  };

  return (
    <Container fluid className="p-4 bg-light">
      <h3 className="mb-4">Insert Meal Details</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="meal">
              <Form.Label>Meal Type</Form.Label>
              <Form.Control
                as="select"
                name="meal"
                value={mealData.meal || ""}
                onChange={handleChange}
              >
                <option value="select">Select Meal Type</option>
                <option value="Snacks">Snacks</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Dinner">Dinner</option>
                <option value="Lunch">Lunch</option>
              </Form.Control>
              {errors.meal && (
                <Form.Text className="text-danger">{errors.meal}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="mealDate">
              <Form.Label>Meal Date</Form.Label>
              <Form.Control
                type="date"
                name="mealDate"
                value={mealData.mealDate || ""}
                onChange={handleChange}
              />
              {errors.mealDate && (
                <Form.Text className="text-danger">{errors.mealDate}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="userid">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="number"
                name="userid"
                value={mealData.userid || ""}
                onChange={handleChange}
                placeholder="eg: 1"
              />
              {errors.userid && (
                <Form.Text className="text-danger">{errors.userid}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="foodName">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                name="foodName"
                value={mealData.foodName || ""}
                onChange={handleChange}
                placeholder="eg : Dosa"
              />
              {errors.foodName && (
                <Form.Text className="text-danger">{errors.foodName}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity (grams)</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={mealData.quantity || ""}
                onChange={handleChange}
                placeholder="eg : 50"
              />
              {errors.quantity && (
                <Form.Text className="text-danger">{errors.quantity}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="calories">
              <Form.Label>Calories</Form.Label>
              <Form.Control
                type="number"
                name="calories"
                value={mealData.calories || ""}
                onChange={handleChange}
                placeholder="eg : 50"
              />
              {errors.calories && (
                <Form.Text className="text-danger">{errors.calories}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="protein">
              <Form.Label>Protein (g)</Form.Label>
              <Form.Control
                type="number"
                name="protein"
                value={mealData.protein || ""}
                onChange={handleChange}
                placeholder="eg : 50"
              />
              {errors.protein && (
                <Form.Text className="text-danger">{errors.protein}</Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="carbs">
              <Form.Label>CarboHydrate (g)</Form.Label>
              <Form.Control
                type="number"
                name="carbs"
                value={mealData.carbs || ""}
                onChange={handleChange}
                placeholder="eg : 50"
              />
              {errors.carbs && (
                <Form.Text className="text-danger">{errors.carbs}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group controlId="vitamins">
              <Form.Label>Vitamins (mg)</Form.Label>
              <Form.Control
                type="number"
                name="vitamins"
                value={mealData.vitamins || ""}
                onChange={handleChange}
                placeholder="eg : 50"
              />
              {errors.vitamins && (
                <Form.Text className="text-danger">{errors.vitamins}</Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
