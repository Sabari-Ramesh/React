import React, { Component } from "react";
import { Table, Container, Alert } from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector"; 

export default class FindByUserId extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      mealDetails: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchMealDetails();
  }

  fetchMealDetails = () => {
    const userId = this.context?.userId;
    fetch(`http://localhost:8080/mealdetails/findbyuserId/${userId}`)
      .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          return response.text(); // treat it as text
        }
      })
      .then((data) => {
        if (typeof data === "string" && data === "No Details Available") {
          this.setState({ error: data });
        } else {
          // Set meal details if data is valid JSON
          this.setState({ mealDetails: data, error: null });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const { mealDetails, error } = this.state;

    return (
      <Container className="mt-4">
        <h2 className="text-center">Find Meal Details </h2>
        {error ? (
          <Alert variant="danger">Error: {error}</Alert>
        ) : mealDetails ? (
          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>Meal ID</th>
                <th>Meal Type</th>
                <th>Date</th>
                <th>Food Name</th>
                <th>Quantity (grams)</th>
                <th>Calories</th>
                <th>Protein (grams)</th>
                <th>Carbohydrates (grams)</th>
                <th>Vitamins (mg)</th>
              </tr>
            </thead>
            <tbody>
              {mealDetails.map((detail) => (
                <tr key={detail.mealId}>
                  <td>{detail.mealId}</td>
                  <td>{detail.meal}</td>
                  <td>{detail.mealDate}</td>
                  <td>{detail.foodName}</td>
                  <td>{detail.quantity}</td>
                  <td>{detail.calories}</td>
                  <td>{detail.protein}</td>
                  <td>{detail.carbs}</td>
                  <td>{detail.vitamins}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Loading meal details...</p>
        )}
      </Container>
    );
  }
}
