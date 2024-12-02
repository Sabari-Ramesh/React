import React, { Component } from "react";
import {
  Table,
  Container,
  Alert,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { UserContext } from "../Login/LoginSelector";

export default class FindByUserId extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      mealDetails: null,
      error: null,
      fileType: "csv", // Default file type
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
          return response.text(); // Treat as text if not JSON
        }
      })
      .then((data) => {
        if (typeof data === "string" && data === "No Details Available") {
          this.setState({ error: data });
        } else {
          this.setState({ mealDetails: data, error: null });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  handleFileTypeChange = (e) => {
    this.setState({ fileType: e.target.value });
  };

  handleDownload = () => {
    const userId = this.context?.userId;
    const { fileType } = this.state;

    if (!userId) {
      this.setState({ error: "User ID is required for downloading." });
      return;
    }

    const downloadUrl = `http://localhost:8080/export/meal-details?format=${fileType}&id=${userId}`;
    window.open(downloadUrl, "_blank");
  };

  render() {
    const { mealDetails, error, fileType } = this.state;

    return (
      <Container className="mt-4">
        <h2 className="text-center">Find Meal Details</h2>

        {/* File Type Selection and Download */}
        <Form className="mb-3">
          <Row>
            <Col xs={6} md={4}>
              <Form.Group>
                <Form.Label>Select File Type</Form.Label>
                <Form.Control
                  as="select"
                  value={fileType}
                  onChange={this.handleFileTypeChange}
                >
                  <option value="csv">CSV</option>
                  <option value="excel">Excel</option>
                  <option value="pdf">PDF</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6} className="d-flex align-items-end">
              <Button variant="primary" onClick={this.handleDownload}>
                Download
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Error Alert */}
        {error && <Alert variant="danger">Error: {error}</Alert>}

        {/* Meal Details Table */}
        {mealDetails ? (
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
