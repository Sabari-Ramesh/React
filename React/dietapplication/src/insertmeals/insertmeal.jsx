import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector"; // Import UserContext
//import {UserContext} from "../contexts/UserProvider "
import "./insert.css";

class Insert extends Component {
  static contextType = UserContext; // Set contextType to use UserContext

  constructor(props) {
    super(props);
    this.state = {
      mealData: {
        meal: null,
        mealDate: null,
        userid: "",
        foodName: null,
        quantity: null,
        calories: null,
        protein: null,
        carbs: null,
        vitamins: null,
      },
      errors: {
        meal: "",
        mealDate: "",
        foodName: "",
        quantity: "",
        calories: "",
        protein: "",
        carbs: "",
        vitamins: "",
      },
      responseMessage: "",
      mealId: null,
      showNotification: false,
    };
  }

  componentDidMount() {
    const userId = this.context?.userId;
    if (userId) {
      this.setState((prevState) => ({
        mealData: {
          ...prevState.mealData,
          userid: userId,
        },
      }));
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "foodName" && value && !/^[A-Za-z\s]+$/.test(value)) {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          [name]: "Only alphabets and spaces are allowed",
        },
      }));
      return;
    }

    if (
      ["quantity", "calories", "protein", "carbs", "vitamins"].includes(name) &&
      value < 0
    ) {
      this.setState((prevState) => ({
        errors: { ...prevState.errors, [name]: "Value should not be negative" },
      }));
      return;
    }

    if (name === "mealDate") {
      const selectedDate = new Date(value);
      const today = new Date();

      if (selectedDate > today) {
        this.setState((prevState) => ({
          errors: {
            ...prevState.errors,
            mealDate: "Meal date cannot be in the future",
          },
        }));
        return;
      }
    }

    this.setState((prevState) => ({
      mealData: {
        ...prevState.mealData,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const { quantity, calories, protein, carbs, vitamins } =
      this.state.mealData;

    if (quantity < calories + protein + carbs + vitamins) {
      newErrors.quantity =
        "Quantity should be greater than or equal to the sum of calories, protein, carbs, and vitamins";
    }

    Object.keys(this.state.mealData).forEach((key) => {
      if (!this.state.mealData[key] && key !== "userid") {
        newErrors[key] = "This field is required";
      }
      if (this.state.mealData.meal === "select") {
        newErrors.meal = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      this.setState({ errors: newErrors });
    } else {
      const payload = { ...this.state.mealData };

      fetch("http://localhost:8080/mealdetails/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Error: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          const mealIdMatch = data.match(/Meal Id : (\d+)/);
          const mealId = mealIdMatch ? mealIdMatch[1] : null;

          this.setState({
            responseMessage: data,
            mealId,
            showNotification: true,
            mealData: {
              meal: null,
              mealDate: null,
              userid: this.context?.userId,
              foodName: null,
              quantity: null,
              calories: null,
              protein: null,
              carbs: null,
              vitamins: null,
            },
          });

          setTimeout(() => {
            this.setState({ showNotification: false });
          }, 5000);
        })
        .catch((error) => {
          this.setState({
            responseMessage: `Failed to create meal details: ${error.message}`,
            showNotification: true,
          });

          setTimeout(() => {
            this.setState({ showNotification: false });
          }, 5000);
        });
    }
  };

  render() {
    const { mealData, errors, mealId, showNotification } = this.state;

    return (
      <Container fluid className="p-4 bg-light">
        {showNotification && (
          <div className="notification-card">
            {mealId && (
              <p>
                Generated Meal ID: <strong>{mealId}</strong>
              </p>
            )}
          </div>
        )}

        <h3 className="mb-4 text-center">Insert Meal Details</h3>
        <Form onSubmit={this.handleSubmit}>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="meal">
                <Form.Label>Meal Type</Form.Label>
                <Form.Control
                  as="select"
                  name="meal"
                  value={mealData.meal || ""}
                  onChange={this.handleChange}
                >
                  <option value="select">Select Meal Type</option>
                  <option value="Snack">Snack</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Lunch">Lunch</option>
                </Form.Control>
                {errors.meal && (
                  <Form.Text className="text-danger">{errors.meal}</Form.Text>
                )}
              </Form.Group>
            </Col>

            {/* Meal Date */}
            <Col xs={12} md={6}>
              <Form.Group controlId="mealDate">
                <Form.Label>Meal Date</Form.Label>
                <Form.Control
                  type="date"
                  name="mealDate"
                  value={mealData.mealDate || ""}
                  onChange={this.handleChange}
                />
                {errors.mealDate && (
                  <Form.Text className="text-danger">
                    {errors.mealDate}
                  </Form.Text>
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
                  readOnly
                />
              </Form.Group>
            </Col>

            {/* Food Name */}
            <Col xs={12} md={6}>
              <Form.Group controlId="foodName">
                <Form.Label>Food Name</Form.Label>
                <Form.Control
                  type="text"
                  name="foodName"
                  value={mealData.foodName || ""}
                  onChange={this.handleChange}
                  placeholder="e.g., Apple"
                />
                {errors.foodName && (
                  <Form.Text className="text-danger">
                    {errors.foodName}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Quantity and Calories */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity (grams)</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={mealData.quantity || ""}
                  onChange={this.handleChange}
                  placeholder="e.g., 100"
                />
                {errors.quantity && (
                  <Form.Text className="text-danger">
                    {errors.quantity}
                  </Form.Text>
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
                  onChange={this.handleChange}
                  placeholder="e.g., 10"
                />
                {errors.calories && (
                  <Form.Text className="text-danger">
                    {errors.calories}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Protein and Carbohydrates */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="protein">
                <Form.Label>Protein (grams)</Form.Label>
                <Form.Control
                  type="number"
                  name="protein"
                  value={mealData.protein || ""}
                  onChange={this.handleChange}
                  placeholder="e.g., 50"
                />
                {errors.protein && (
                  <Form.Text className="text-danger">
                    {errors.protein}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="carbs">
                <Form.Label>Carbohydrates (grams)</Form.Label>
                <Form.Control
                  type="number"
                  name="carbs"
                  value={mealData.carbs || ""}
                  onChange={this.handleChange}
                  placeholder="e.g., 50"
                />
                {errors.carbs && (
                  <Form.Text className="text-danger">{errors.carbs}</Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Vitamins */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="vitamins">
                <Form.Label>Vitamins (mg)</Form.Label>
                <Form.Control
                  type="number"
                  name="vitamins"
                  value={mealData.vitamins || ""}
                  onChange={this.handleChange}
                  placeholder="e.g., 0.50"
                />
                {errors.vitamins && (
                  <Form.Text className="text-danger">
                    {errors.vitamins}
                  </Form.Text>
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
}

export default Insert;
